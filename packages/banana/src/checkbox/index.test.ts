import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import BCheckbox from '.';

describe('b-checkbox', () => {
  it('accessibility tests', async () => {
    const element = await fixture<BCheckbox>(html`<b-checkbox>Checkbox</b-checkbox>`);
    await expect(element).to.be.accessible();
  });

  describe('when provided no parameters', async () => {
    const element = await fixture<BCheckbox>(html`<b-checkbox></b-checkbox>`);

    it('should have correct default values', () => {
      expect(element.name).to.equal('');
      expect(element.checked).to.equal(false);
      expect(element.defaultChecked).to.equal(false);
      expect(element.disabled).to.equal(false);
      expect(element.required).to.equal(false);
      expect(element.readonly).to.equal(false);
      expect(element.controlled).to.equal(false);
      expect(element.size).to.equal('medium');
      expect(element.indeterminate).to.equal(false);
      expect(element.form).to.equal(undefined);
    });

    it('should have validation methods', () => {
      expect(element.reportValidity).to.be.a('function');
      expect(element.checkValidity).to.be.a('function');
    });
  });

  describe('when provided parameters', async () => {
    const element = await fixture<BCheckbox>(html`<b-checkbox
      name="test"
      checked
      default-checked
      disabled
      required
      readonly
      controlled
      size="small"
      indeterminate
      form="test"
      >Checkbox</b-checkbox
    >`);

    it('should have correct values', () => {
      expect(element.name).to.equal('test');
      expect(element.checked).to.equal(true);
      expect(element.defaultChecked).to.equal(true);
      expect(element.disabled).to.equal(true);
      expect(element.required).to.equal(true);
      expect(element.readonly).to.equal(true);
      expect(element.controlled).to.equal(true);
      expect(element.size).to.equal('small');
      expect(element.indeterminate).to.equal(true);
      expect(element.form).to.equal('test');
    });

    it('should have correct label in the light DOM', () => {
      expect(element.textContent).to.equal('Checkbox');
    });
  });

  describe('when clicked', () => {
    it('normal checkbox should toggle the checked state', async () => {
      const element = await fixture<BCheckbox>(html`<b-checkbox>Checkbox</b-checkbox>`);
      // The click event listener is on a container element.
      const clickElement = element.shadowRoot?.querySelector('.checkbox') as HTMLLabelElement;

      // Change event should be fired.
      const spy = sinon.spy();
      element.addEventListener('change', spy);
      clickElement.click();
      await element.updateComplete;
      expect(element.checked).to.equal(true);
      expect(spy.calledOnce).to.equal(true);
      clickElement.click();
      await element.updateComplete;
      expect(element.checked).to.equal(false);
      expect(spy.calledTwice).to.equal(true);
    });

    it('disabled checkbox should not toggle the checked state', async () => {
      const element = await fixture<BCheckbox>(html`<b-checkbox disabled>Checkbox</b-checkbox>`);
      const clickElement = element.shadowRoot?.querySelector('.checkbox') as HTMLLabelElement;

      // Change event should not be fired.
      const spy = sinon.spy();
      element.addEventListener('change', spy);
      clickElement.click();
      await element.updateComplete;
      expect(element.checked).to.equal(false);
      expect(spy.called).to.equal(false);
    });

    it('readonly checkbox should not toggle the checked state', async () => {
      const element = await fixture<BCheckbox>(html`<b-checkbox readonly>Checkbox</b-checkbox>`);
      const clickElement = element.shadowRoot?.querySelector('.checkbox') as HTMLLabelElement;

      // Change event should not be fired.
      const spy = sinon.spy();
      element.addEventListener('change', spy);
      clickElement.click();
      await element.updateComplete;
      expect(element.checked).to.equal(false);
      expect(spy.called).to.equal(false);
    });

    it('should not toggle the checked state when the checkbox is controlled', async () => {
      const element = await fixture<BCheckbox>(html`<b-checkbox controlled>Checkbox</b-checkbox>`);
      const clickElement = element.shadowRoot?.querySelector('.checkbox') as HTMLLabelElement;

      // Change event should be fired.
      const spy = sinon.spy();
      element.addEventListener('change', spy);
      clickElement.click();
      await element.updateComplete;
      expect(element.checked).to.equal(false);
      expect(spy.calledOnce).to.equal(true);
      clickElement.click();
      await element.updateComplete;
      expect(element.checked).to.equal(false);
      expect(spy.calledTwice).to.equal(true);
    });
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

    it('should not submit the form when a required checkbox is not checked', async () => {
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
