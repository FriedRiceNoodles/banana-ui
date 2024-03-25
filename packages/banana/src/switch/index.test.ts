import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import BSwitch from '.';

describe('b-switch', () => {
  it('accessibility tests', async () => {
    const element = await fixture<BSwitch>(html`<b-switch></b-switch>`);
    await expect(element).to.be.accessible();
  });

  describe('when provided no parameters', async () => {
    const element = await fixture<BSwitch>(html`<b-switch></b-switch>`);

    it('should have correct default values', () => {
      expect(element.name).to.equal('');
      expect(element.checked).to.equal(false);
      expect(element.defaultChecked).to.equal(false);
      expect(element.disabled).to.equal(false);
      expect(element.required).to.equal(false);
      expect(element.readonly).to.equal(false);
      expect(element.controlled).to.equal(false);
      expect(element.form).to.equal(undefined);
    });

    it('should have validation methods', () => {
      expect(element.reportValidity).to.be.a('function');
      expect(element.checkValidity).to.be.a('function');
    });
  });

  describe('when provided parameters', async () => {
    const element = await fixture<BSwitch>(html`<b-switch
      name="test"
      checked
      default-checked
      disabled
      required
      readonly
      controlled
      form="test"
    >
    </b-switch> `);

    it('should have correct values', () => {
      expect(element.name).to.equal('test');
      expect(element.checked).to.equal(true);
      expect(element.defaultChecked).to.equal(true);
      expect(element.disabled).to.equal(true);
      expect(element.required).to.equal(true);
      expect(element.readonly).to.equal(true);
      expect(element.controlled).to.equal(true);
      expect(element.form).to.equal('test');
    });
  });

  describe('when clicked', () => {
    it('normal switch should toggle the checked state', async () => {
      const element = await fixture<BSwitch>(html`<b-switch></b-switch>>`);
      // The click event listener is on a container element.
      const clickElement = element.shadowRoot?.querySelector('.banana-switch') as HTMLLabelElement;

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

    it('disabled switch should not toggle the checked state', async () => {
      const element = await fixture<BSwitch>(html`<b-switch disabled></b-switch>`);
      const clickElement = element.shadowRoot?.querySelector('.banana-switch') as HTMLLabelElement;

      // Change event should not be fired.
      const spy = sinon.spy();
      element.addEventListener('change', spy);
      clickElement.click();
      await element.updateComplete;
      expect(element.checked).to.equal(false);
      expect(spy.called).to.equal(false);
    });

    it('readonly switch should not toggle the checked state', async () => {
      const element = await fixture<BSwitch>(html`<b-switch readonly></b-switch>`);
      const clickElement = element.shadowRoot?.querySelector('.banana-switch') as HTMLLabelElement;

      // Change event should not be fired.
      const spy = sinon.spy();
      element.addEventListener('change', spy);
      clickElement.click();
      await element.updateComplete;
      expect(element.checked).to.equal(false);
      expect(spy.called).to.equal(false);
    });

    it('should not toggle the checked state when the switch is controlled', async () => {
      const element = await fixture<BSwitch>(html`<b-switch controlled></b-switch>>`);
      const clickElement = element.shadowRoot?.querySelector('.banana-switch') as HTMLLabelElement;

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

    // it('should toggle the display text when provide slot to switch', async () => {
    //   const element = await fixture<BSwitch>(html`<b-switch>
    //     <span slot="checked_content">open</span>
    //     <span slot="unchecked_content">unOpen</span>
    //   </b-switch>`);
    //   const clickElement = element.shadowRoot?.querySelector('.banana-switch') as HTMLLabelElement;

    //   const checkedEl = element.shadowRoot?.querySelector('.switch__inner-checked') as HTMLLabelElement;

    //   const unCheckedEl = element.shadowRoot?.querySelector('.switch__inner-unchecked') as HTMLLabelElement;

    //   console.log('checkedEl', checkedEl);

    //   // Change event should be fired.
    //   expect(unCheckedEl.textContent).equal('unOpen');
    //   const spy = sinon.spy();
    //   element.addEventListener('change', spy);
    //   clickElement.click();
    //   await element.updateComplete;
    //   expect(checkedEl.textContent).equal('open');
    // });
  });

  describe('form', () => {
    it('a native form should be able to get the value of switch', async () => {
      const element = await fixture<HTMLFormElement>(
        html` <form>
          <b-switch name="test" checked></b-switch>
        </form>`,
      );

      // Should get correct form data.
      const formData = new FormData(element);
      console.log(typeof formData.get('test'));

      expect(formData.get('test')).to.equal('true');
    });

    it('should not submit the form when a required switch is empty', async () => {
      const element = await fixture<HTMLFormElement>(html`<form
        @submit=${(event: Event) => {
          event.preventDefault();
        }}
      >
        <b-switch name="test" required></b-switch>
      </form>`);
      const switch0 = element.querySelector('b-switch') as BSwitch;
      const spy = sinon.spy();
      element.addEventListener('submit', spy);

      // Then make it not empty then submit the form.
      switch0.checked = true;
      element.requestSubmit();

      // It should submit the form now.
      expect(spy.calledOnce).to.equal(true);
    });

    it('a disabled switch should not be a part of the form data, even if it has a name', async () => {
      const element = await fixture<HTMLFormElement>(html`<form
        @submit=${(event: Event) => {
          event.preventDefault();
        }}
      >
        <b-switch name="test" disabled checked></b-switch>
      </form>`);

      // Should get correct form data.
      const formData = new FormData(element);
      expect(formData.get('test')).to.equal(null);
    });

    it('should be valid and submit the form when a empty required switch is disabled', async () => {
      const element = await fixture<HTMLFormElement>(html`<form
        @submit=${(event: Event) => {
          event.preventDefault();
        }}
      >
        <b-switch name="test" required disabled></b-switch>
      </form>`);
      const spy = sinon.spy();
      element.addEventListener('submit', spy);

      element.requestSubmit();
      expect(spy.calledOnce).to.equal(true);
    });

    it('should be valid and submit the form when a required switch0 is empty and the form is novaalidate', async () => {
      const element = await fixture<HTMLFormElement>(html`<form
        novalidate
        @submit=${(event: Event) => {
          event.preventDefault();
        }}
      >
        <b-switch name="test" required></b-switch>
      </form>`);
      const spy = sinon.spy();
      element.addEventListener('submit', spy);

      element.requestSubmit();
      expect(spy.calledOnce).to.equal(true);
    });

    it('should become the default value when the form is reset', async () => {
      const element = await fixture<HTMLFormElement>(html`<form>
        <b-switch name="test" default-checked></b-switch>
      </form>`);
      const switchTest = element.querySelector('b-switch') as BSwitch;

      expect(switchTest.checked).to.equal(true);

      element.reset();
      expect(switchTest.checked).to.equal(true);
    });
  });
});
