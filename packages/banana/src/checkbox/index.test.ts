import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import BCheckbox from '.';

describe('b-checkbox', () => {
  it('accessibility tests', async () => {
    const element = await fixture<BCheckbox>(html`<b-checkbox>Checkbox</b-checkbox>`);
    await expect(element).to.be.accessible();
  });

  describe('form', () => {
    it('a native form should be able to get the value of checkbox', async () => {
      const element = await fixture<HTMLFormElement>(html`<form>
        <b-checkbox name="test" checked></b-checkbox>
      </form>`);

      // Should get correct form data.
      const formData = new FormData(element);
      // FormData.get() always returns a string.
      expect(formData.get('test')).to.equal('true');
    });

    it('should not submit the form when a required checkbox is  not checked', async () => {
      const element = await fixture<HTMLFormElement>(html`<form
        @submit=${(event: Event) => {
          event.preventDefault();
        }}
      >
        <b-checkbox name="test" required></b-checkbox>
      </form>`);
      const checkbox = element.querySelector('b-checkbox') as BCheckbox;
      const spy = sinon.spy();
      element.addEventListener('submit', spy);

      element.requestSubmit();
      expect(spy.called).to.equal(false);

      // Then make it checked and submit the form again.
      checkbox.checked = true;
      await checkbox.updateComplete;
      element.requestSubmit();

      // It should submit the form now.
      expect(spy.calledOnce).to.equal(true);
    });

    it('a disabled checkbox should not be a part of the form data, even if it has a name', async () => {
      const element = await fixture<HTMLFormElement>(html`<form
        @submit=${(event: Event) => {
          event.preventDefault();
        }}
      >
        <b-checkbox name="test" disabled value="test"></b-checkbox>
      </form>`);

      // Should get correct form data.
      const formData = new FormData(element);
      expect(formData.get('test')).to.equal(null);
    });

    it('should be valid and submit the form when a empty required checkbox is disabled', async () => {
      const element = await fixture<HTMLFormElement>(html`<form
        @submit=${(event: Event) => {
          event.preventDefault();
        }}
      >
        <b-checkbox name="test" required disabled></b-checkbox>
      </form>`);
      const spy = sinon.spy();
      element.addEventListener('submit', spy);

      element.requestSubmit();
      expect(spy.calledOnce).to.equal(true);
    });

    it('should be valid and submit the form when a required checkbox is empty and the form is novaalidate', async () => {
      const element = await fixture<HTMLFormElement>(html`<form
        novalidate
        @submit=${(event: Event) => {
          event.preventDefault();
        }}
      >
        <b-checkbox name="test" required></b-checkbox>
      </form>`);
      const spy = sinon.spy();
      element.addEventListener('submit', spy);

      element.requestSubmit();
      expect(spy.calledOnce).to.equal(true);
    });

    it('should become the default value when the form is reset', async () => {
      const element = await fixture<HTMLFormElement>(html`<form>
        <b-checkbox name="test" default-checked></b-checkbox>
      </form>`);
      const checkbox = element.querySelector('b-checkbox') as BCheckbox;

      expect(checkbox.checked).to.equal(true);

      // Set the checkbox to unchecked.
      checkbox.checked = false;
      expect(checkbox.checked).to.equal(false);

      element.reset();
      expect(checkbox.checked).to.equal(true);
    });
  });
});
