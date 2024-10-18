import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import BCountdown from '.';

describe('b-countdown', () => {
  it('accessibility tests', async () => {
    const element = await fixture<BCountdown>(html`<b-countdown></b-countdown>`);
    await expect(element).to.be.accessible();
  });

  it('when provided no parameters', async () => {
    const element = await fixture<BCountdown>(html`<b-countdown></b-countdown>`);
    expect(element).shadowDom.to.equal(`
      <span class="countdown countdown--default" part="base">00:00:00</span>
    `);
    expect(element.time).to.equal(0);
    expect(element.format).to.equal('HH:mm:ss');
    expect(element.separate).to.equal(false);
  });

  it('when provided time', async () => {
    const element = await fixture<BCountdown>(html`<b-countdown time="1000"></b-countdown>`);
    expect(element).shadowDom.to.equal(`
      <span class="countdown countdown--default" part="base">00:00:01</span>
    `);
    expect(element.time).to.equal(1000);
    expect(element.format).to.equal('HH:mm:ss');
    expect(element.separate).to.equal(false);

    element.time = 5000;
    await element.updateComplete;
    await aTimeout(1000);
    expect(element).shadowDom.to.equal(`
      <span class="countdown countdown--default" part="base">00:00:04</span>
    `);
    expect(element.time).to.equal(5000);

    element.setAttribute('time', '-3000');
    await element.updateComplete;
    await aTimeout(1000);
    expect(element).shadowDom.to.equal(`
      <span class="countdown countdown--default" part="base">00:00:00</span>
    `);
    expect(element.time).to.equal(-3000);
  });

  describe('when provided format', () => {
    it('should render correctly', async () => {
      const element = await fixture<BCountdown>(html`<b-countdown time="1000" format="HH:mm"></b-countdown>`);
      expect(element).shadowDom.to.equal(`
        <span class="countdown countdown--default" part="base">00:00</span>
      `);
      expect(element.time).to.equal(1000);
      expect(element.format).to.equal('HH:mm');
      expect(element.separate).to.equal(false);

      // Should not reset time when format changed, and should render the new format
      element.format = 'HH:mm:ss';
      await element.updateComplete;
      await aTimeout(1000);
      expect(element).shadowDom.to.equal(`
        <span class="countdown countdown--default" part="base">00:00:00</span>
      `);
      expect(element.time).to.equal(1000);

      // A new element with a long time and a long format
      // 6Years 6Months 6Days 6Hours 6Minutes 6Seconds 666Milliseconds
      const longTime =
        6 * 365 * 24 * 60 * 60 * 1000 +
        6 * 30 * 24 * 60 * 60 * 1000 +
        6 * 24 * 60 * 60 * 1000 +
        6 * 60 * 60 * 1000 +
        6 * 60 * 1000 +
        6 * 1000 +
        666;
      const longFormat = 'YY:MM:DD:HH:mm:ss.SSS';
      const longElement = await fixture<BCountdown>(
        html`<b-countdown time="${longTime}" format="${longFormat}"></b-countdown>`,
      );
      expect(longElement).shadowDom.to.equal(`
        <span class="countdown countdown--default" part="base">06:06:06:06:06:06.666</span>
      `);
      expect(longElement.time).to.equal(longTime);
      expect(longElement.format).to.equal(longFormat);
      expect(longElement.separate).to.equal(false);

      // To escape characters, wrap them in square brackets (e.g. [MM]).
      // See https://day.js.org/docs/en/display/format
      const escapeFormat = 'HH:mm:ss.SSS [MM]';
      const escapeElement = await fixture<BCountdown>(
        html`<b-countdown time="1000" format="${escapeFormat}"></b-countdown>`,
      );
      expect(escapeElement).shadowDom.to.equal(`
        <span class="countdown countdown--default" part="base">00:00:01.000 MM</span>
      `);
      expect(escapeElement.time).to.equal(1000);
      expect(escapeElement.format).to.equal(escapeFormat);
      expect(escapeElement.separate).to.equal(false);
    });

    it('should pad the time with 0 if the format is longer than the time', async () => {
      const element = await fixture<BCountdown>(html`<b-countdown time="1001" format="HH:mm:ss.SSS"></b-countdown>`);
      expect(element).shadowDom.to.equal(`
        <span class="countdown countdown--default" part="base">00:00:01.001</span>
      `);
    });

    it('should not pad the time with 0 if the format is shorter or equal to the time', async () => {
      const element = await fixture<BCountdown>(html`<b-countdown time="1001" format="HH:mm:ss.S"></b-countdown>`);
      expect(element).shadowDom.to.equal(`
        <span class="countdown countdown--default" part="base">00:00:01.1</span>
      `);
    });
  });

  describe('when provided separate', () => {
    it('should render correctly when provided no slot', async () => {
      const element = await fixture<BCountdown>(html`<b-countdown time="2000" separate></b-countdown>`);
      // Should not have separator when there is no slot, but should have a hidden and empty separator slot
      expect(element).shadowDom.to.equal(`
        <span class="countdown countdown--separate" part="base">
          <span class="countdown__item" part="separate-item separate-item-0">00</span>
          <span class="countdown__item" part="separate-item separate-item-1">00</span>
          <span class="countdown__item" part="separate-item separate-item-2">02</span>
        </span>
        <slot hidden name="separator" class="countdown__separator"></slot>
      `);
      expect(element.time).to.equal(2000);
      expect(element.format).to.equal('HH:mm:ss');
      expect(element.separate).to.equal(true);

      // Should not reset time when separate changed, and should render the new separate
      element.separate = false;
      await element.updateComplete;
      await aTimeout(1000);
      expect(element).shadowDom.to.equal(`
        <span class="countdown countdown--default" part="base">00:00:01</span>
      `);
      expect(element.time).to.equal(2000);
    });

    it('should render correctly when provided slot', async () => {
      const element = await fixture<BCountdown>(
        html`<b-countdown time="2000" separate><span class="separator" slot="separator">:</span></b-countdown>`,
      );
      // Should have separator when there is a slot
      expect(element).shadowDom.to.equal(`
        <span class="countdown countdown--separate" part="base">
          <span class="countdown__item" part="separate-item separate-item-0">00</span>
          <span class="separator" slot="separator" part="separator">:</span>
          <span class="countdown__item" part="separate-item separate-item-1">00</span>
          <span class="separator" slot="separator" part="separator">:</span>
          <span class="countdown__item" part="separate-item separate-item-2">02</span>
        </span>
        <slot hidden name="separator" class="countdown__separator"></slot>
      `);
      expect(element.time).to.equal(2000);
      expect(element.format).to.equal('HH:mm:ss');
      expect(element.separate).to.equal(true);
    });
  });

  it('should emit the change event when time changed', async () => {
    const element = await fixture<BCountdown>(html`<b-countdown time="100"></b-countdown>`);
    const spy = sinon.spy();
    element.addEventListener('change', spy);
    await aTimeout(200);
    expect(spy.called).to.equal(true);
  });

  it('should emit the finish event when time is up', async () => {
    const element = await fixture<BCountdown>(html`<b-countdown time="1000"></b-countdown>`);
    const spy = sinon.spy();
    element.addEventListener('finish', spy);
    await aTimeout(1200);
    expect(spy.calledOnce).to.equal(true);
  });

  it('css variables should work', async () => {
    const element = await fixture<BCountdown>(
      html`<b-countdown
        style="--banana-countdown-font-size: 20px; --banana-countdown-font-weight: 600; --banana-countdown-color: #f00;"
      ></b-countdown>`,
    );
    expect(getComputedStyle(element).fontSize).to.equal('20px');
    expect(getComputedStyle(element).fontWeight).to.equal('600');
    expect(getComputedStyle(element).color).to.equal('rgb(255, 0, 0)');

    element.style.setProperty('--banana-countdown-font-size', '30px');
    element.style.setProperty('--banana-countdown-font-weight', '700');
    element.style.setProperty('--banana-countdown-color', '#0f0');
    await element.updateComplete;
    expect(getComputedStyle(element).fontSize).to.equal('30px');
    expect(getComputedStyle(element).fontWeight).to.equal('700');
    expect(getComputedStyle(element).color).to.equal('rgb(0, 255, 0)');
  });
});
