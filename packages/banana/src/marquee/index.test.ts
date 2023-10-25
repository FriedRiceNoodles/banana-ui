import { expect, fixture, html } from '@open-wc/testing';
import BMarquee from '.';
import { sendMouse } from '@web/test-runner-commands';

describe('b-marquee', () => {
  it('accessibility tests', async () => {
    const element = await fixture<BMarquee>(html`<b-marquee></b-marquee>`);
    await expect(element).to.be.accessible();
  });

  it('when provided no parameters', async () => {
    const element = await fixture<BMarquee>(html`<b-marquee></b-marquee>`);
    const color = window.getComputedStyle(element).color;
    const duration = window.getComputedStyle(element).getPropertyValue('--banana-marquee-duration');

    expect(color).to.equal('rgb(0, 0, 0)');
    expect(duration).to.equal('20s');

    expect(element.content).to.equal('');
    expect(element.color).to.equal(undefined);
    expect(element.duration).to.equal(20);
    expect(element.pauseWhenHover).to.equal(false);
  });

  describe('custom content', () => {
    it('should set the content when provided a string', async () => {
      const element = await fixture<BMarquee>(html`<b-marquee content="Hello World"></b-marquee>`);
      const content = element.shadowRoot?.querySelector('.content')?.textContent;
      expect(content).to.equal('Hello World');
    });
  });

  describe('custom color', () => {
    it('should set the color when provided a string', async () => {
      const element = await fixture<BMarquee>(html`<b-marquee color="red"></b-marquee>`);
      const color = window.getComputedStyle(element).color;
      expect(color).to.equal('rgb(255, 0, 0)');
    });

    it('should set the color when using css variables', async () => {
      const element = await fixture<BMarquee>(html`<b-marquee style="--banana-marquee-color: red"></b-marquee>`);
      const color = window.getComputedStyle(element).color;
      expect(color).to.equal('rgb(255, 0, 0)');
    });
  });

  describe('custom duration', () => {
    it('should set the duration when provided a number', async () => {
      const element = await fixture<BMarquee>(html`<b-marquee duration="10"></b-marquee>`);
      const duration = window.getComputedStyle(element).getPropertyValue('--banana-marquee-duration');
      expect(duration).to.equal('10s');
    });
  });

  describe('custom pause-when-hover', () => {
    it('when set to true', async () => {
      const text =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.';
      const element = await fixture<BMarquee>(html`<b-marquee content=${text} pause-when-hover></b-marquee>`);
      const pauseWhenHover = element.shadowRoot
        ?.querySelector('.marquee')
        ?.classList?.contains('marquee--pause-when-hover');
      expect(pauseWhenHover).to.equal(true);

      const base = element.shadowRoot?.querySelector('.marquee');
      const content = element.shadowRoot?.querySelector('.content');
      expect(base!.classList.contains('marquee--pause-when-hover')).to.equal(true);
      const animationPlayState = window.getComputedStyle(content!).getPropertyValue('animation-play-state');
      expect(animationPlayState).to.equal('running');

      // Simulate mouse hover, only works on devices that support hover.
      await sendMouse({ type: 'move', position: [10, 10] });
      const animationPlayState2 = window.getComputedStyle(content!).getPropertyValue('animation-play-state');
      expect(animationPlayState2).to.equal('paused');

      // Simulate mouse leave.
      await sendMouse({ type: 'move', position: [0, 0] });
      const animationPlayState3 = window.getComputedStyle(content!).getPropertyValue('animation-play-state');
      expect(animationPlayState3).to.equal('running');
    });

    it('when not set', async () => {
      const element = await fixture<BMarquee>(html`<b-marquee></b-marquee>`);
      expect(element.pauseWhenHover).to.equal(false);
      const pauseWhenHover = element.shadowRoot
        ?.querySelector('.marquee')
        ?.classList?.contains('marquee--pause-when-hover');
      expect(pauseWhenHover).to.equal(false);

      const base = element.shadowRoot?.querySelector('.marquee');
      const content = element.shadowRoot?.querySelector('.content');
      expect(base!.classList.contains('marquee--pause-when-hover')).to.equal(false);
      const animationPlayState = window.getComputedStyle(content!).getPropertyValue('animation-play-state');
      expect(animationPlayState).to.equal('running');

      // Simulate mouse hover.
      await sendMouse({ type: 'move', position: [10, 10] });
      const animationPlayState2 = window.getComputedStyle(content!).getPropertyValue('animation-play-state');
      expect(animationPlayState2).to.equal('running');

      // Simulate mouse leave.
      await sendMouse({ type: 'move', position: [0, 0] });
      const animationPlayState3 = window.getComputedStyle(content!).getPropertyValue('animation-play-state');
      expect(animationPlayState3).to.equal('running');
    });
  });
});
