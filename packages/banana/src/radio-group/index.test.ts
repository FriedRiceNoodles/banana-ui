import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import BRadioGroup from '.';

describe('b-radio-group', () => {
  it('accessibility tests', async () => {
    const element = await fixture<BRadioGroup>(html`<b-radio-group></b-radio-group>`);
    await expect(element).to.be.accessible();
  });

  describe('form', () => {
    it('a native form should be able to get the value of radio-group', async () => {
      const element = await fixture<HTMLFormElement>(html`<form>
        <b-radio-group name="test" value="test"></b-radio-group>
      </form>`);

      // Should get correct form data.
      const formData = new FormData(element);
      expect(formData.get('test')).to.equal('test');
    });

    it('should not submit the form when a required radio-group is empty', async () => {
      const element = await fixture<HTMLFormElement>(html`<form
        @submit=${(event: Event) => {
          event.preventDefault();
        }}
      >
        <b-radio-group name="test" required></b-radio-group>
      </form>`);
      const RadioGroup = element.querySelector('b-radio-group') as BRadioGroup;
      const spy = sinon.spy();
      element.addEventListener('submit', spy);

      element.requestSubmit();
      expect(spy.called).to.equal(false);

      // Then make it not empty then submit the form.
      RadioGroup.value = 'test';
      await element.updateComplete;
      element.requestSubmit();

      // It should submit the form now.
      expect(spy.calledOnce).to.equal(true);
    });

    it('a disabled radio-group should not be a part of the form data, even if it has a name', async () => {
      const element = await fixture<HTMLFormElement>(html`<form
        @submit=${(event: Event) => {
          event.preventDefault();
        }}
      >
        <b-radio-group name="test" disabled value="test"></b-radio-group>
      </form>`);

      // Should get correct form data.
      const formData = new FormData(element);
      expect(formData.get('test')).to.equal(null);
    });

    it('should be valid and submit the form when a empty required radio-group is disabled', async () => {
      const element = await fixture<HTMLFormElement>(html`<form
        @submit=${(event: Event) => {
          event.preventDefault();
        }}
      >
        <b-radio-group name="test" required disabled></b-radio-group>
      </form>`);
      const spy = sinon.spy();
      element.addEventListener('submit', spy);

      element.requestSubmit();
      expect(spy.calledOnce).to.equal(true);
    });

    it('should be valid and submit the form when a required radio-group is empty and the form is novaalidate', async () => {
      const element = await fixture<HTMLFormElement>(html`<form
        novalidate
        @submit=${(event: Event) => {
          event.preventDefault();
        }}
      >
        <b-radio-group name="test" required></b-radio-group>
      </form>`);
      const spy = sinon.spy();
      element.addEventListener('submit', spy);

      element.requestSubmit();
      expect(spy.calledOnce).to.equal(true);
    });

    it('should become the default value when the form is reset', async () => {
      const element = await fixture<HTMLFormElement>(html`<form>
        <b-radio-group name="test" value="test" default-value="default"></b-radio-group>
      </form>`);
      const RadioGroup = element.querySelector('b-radio-group') as BRadioGroup;

      expect(RadioGroup.value).to.equal('test');

      element.reset();
      expect(RadioGroup.value).to.equal('default');
    });
  });
});
