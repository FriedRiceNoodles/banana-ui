import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import BSelect from '.';

describe('b-select', () => {
  it('accessibility tests', async () => {
    const element = await fixture<BSelect>(html`<b-select></b-select>`);
    await expect(element).to.be.accessible();
  });

  describe('when provided no parameters', async () => {
    const element = await fixture<BSelect>(html`<b-select></b-select>`);

    it('should have correct default values', () => {
      expect(element.name).to.equal('');
      expect(element.value).to.equal('');
      expect(element.defaultValue).to.equal('');
      expect(element.form).to.equal(undefined);
      expect(element.disabled).to.equal(false);
      expect(element.required).to.equal(false);
      expect(element.readonly).to.equal(false);
      expect(element.controlled).to.equal(false);
      expect(element.placeholder).to.equal('');
      expect(element.size).to.equal('medium');
      expect(element.margin).to.equal(4);
      expect(element.disableAutoAdjustOverflow).to.equal(false);
      expect(element.disableWidthSync).to.equal(false);
      expect(element.multiple).to.equal(false);
      expect(element.clearable).to.equal(false);
      expect(element.noHideOnClear).to.equal(false);
      expect(element.defaultOpen).to.equal(false);
    });

    it('should have validation methods', () => {
      expect(element.reportValidity).to.be.a('function');
      expect(element.checkValidity).to.be.a('function');
    });
  });

  describe('when provided parameters', async () => {
    const element = await fixture<BSelect>(html`
      <b-select
        name="test"
        value="test"
        default-value="default"
        disabled
        required
        readonly
        placeholder="placeholder"
        size="small"
        margin="8"
        disable-auto-adjust-overflow
        disable-width-sync
        multiple
        clearable
        no-hide-on-clear
        default-open
      ></b-select>
    `);

    it('should have correct values', () => {
      expect(element.name).to.equal('test');
      expect(element.value).to.equal('test');
      expect(element.defaultValue).to.equal('default');
      expect(element.disabled).to.equal(true);
      expect(element.required).to.equal(true);
      expect(element.readonly).to.equal(true);
      expect(element.placeholder).to.equal('placeholder');
      expect(element.size).to.equal('small');
      expect(element.margin).to.equal(8);
      expect(element.disableAutoAdjustOverflow).to.equal(true);
      expect(element.disableWidthSync).to.equal(true);
      expect(element.multiple).to.equal(true);
      expect(element.clearable).to.equal(true);
      expect(element.noHideOnClear).to.equal(true);
      expect(element.defaultOpen).to.equal(true);
    });
  });

  describe('when put options in the default slot', async () => {
    const element = await fixture<BSelect>(html`
      <b-select>
        <b-select-option value="apple">Apple</b-select-option>
        <b-select-option value="banana">Banana</b-select-option>
        <b-select-option value="orange">Orange</b-select-option>
      </b-select>
    `);

    it('options should exist in the light DOM', () => {
      const options = element.querySelectorAll('b-select-option');
      expect(options.length).to.equal(3);
    });

    it('listbox should be hidden initially', () => {
      const listbox = element.shadowRoot?.querySelector('.select__listbox') as HTMLElement;
      expect(listbox?.hidden).to.equal(true);
    });

    it('should open the listbox when click the selector of the select', async () => {
      const selector = element.shadowRoot?.querySelector('.select__selector') as HTMLElement;
      selector.click();
      await element.updateComplete;
      const listbox = element.shadowRoot?.querySelector('.select__listbox') as HTMLElement;
      expect(listbox?.hidden).to.equal(false);

      // And should close the listbox when click the selector again.
      selector.click();
      // Wait for the animation to complete.
      // Default animation duration is 150ms.
      await new Promise((resolve) => setTimeout(resolve, 300));
      expect(listbox?.hidden).to.equal(true);
    });
  });

  describe('form', () => {
    it('a native form should be able to get the value of select', async () => {
      const element = await fixture<HTMLFormElement>(html`<form>
        <b-select name="test" value="test"></b-select>
      </form>`);

      // Should get correct form data.
      const formData = new FormData(element);
      expect(formData.get('test')).to.equal('test');
    });

    it('should not submit the form when a required select is empty', async () => {
      const element = await fixture<HTMLFormElement>(html`<form
        @submit=${(event: Event) => {
          event.preventDefault();
        }}
      >
        <b-select name="test" required></b-select>
      </form>`);
      const select = element.querySelector('b-select') as BSelect;
      const spy = sinon.spy();
      element.addEventListener('submit', spy);
      element.requestSubmit();
      expect(spy.called).to.equal(false);

      // Then make it not empty then submit the form.
      select.value = 'test';
      await select.updateComplete;

      element.requestSubmit();
      // It should submit the form now.
      expect(spy.calledOnce).to.equal(true);
    });

    it('a disabled select should not be a part of the form data, even if it has a name', async () => {
      const element = await fixture<HTMLFormElement>(html`<form
        @submit=${(event: Event) => {
          event.preventDefault();
        }}
      >
        <b-select name="test" disabled value="test"></b-select>
      </form>`);

      // Should get correct form data.
      const formData = new FormData(element);
      expect(formData.get('test')).to.equal(null);
    });

    it('should be valid and submit the form when a empty required select is disabled', async () => {
      const element = await fixture<HTMLFormElement>(html`<form
        @submit=${(event: Event) => {
          event.preventDefault();
        }}
      >
        <b-select name="test" required disabled></b-select>
      </form>`);
      const spy = sinon.spy();
      element.addEventListener('submit', spy);

      element.requestSubmit();
      expect(spy.calledOnce).to.equal(true);
    });

    it('should be valid and submit the form when a required select is empty and the form is novaalidate', async () => {
      const element = await fixture<HTMLFormElement>(html`<form
        novalidate
        @submit=${(event: Event) => {
          event.preventDefault();
        }}
      >
        <b-select name="test" required></b-select>
      </form>`);
      const spy = sinon.spy();
      element.addEventListener('submit', spy);

      element.requestSubmit();
      expect(spy.calledOnce).to.equal(true);
    });

    it('should become the default value when the form is reset', async () => {
      const element = await fixture<HTMLFormElement>(html`<form>
        <b-select name="test" value="test" default-value="default"></b-select>
      </form>`);
      const select = element.querySelector('b-select') as BSelect;

      expect(select.value).to.equal('test');

      element.reset();
      expect(select.value).to.equal('default');
    });
  });
});
