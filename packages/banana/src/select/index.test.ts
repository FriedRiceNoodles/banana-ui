import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import BSelect from '.';
import BSelectOption from '../select-option';

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
      expect(element.filter).to.equal(false);
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
        filter
      ></b-select>
    `);

    it('should have correct values', () => {
      expect(element.name).to.equal('test');
      expect(element.value).to.deep.equal(['test']);
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
      expect(element.filter).to.equal(true);
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
      expect(element.open).to.equal(false);
    });

    it('should close the listbox when click the outside of the select', async () => {
      const selector = element.shadowRoot?.querySelector('.select__selector') as HTMLElement;
      selector.click();
      await element.updateComplete;
      const listbox = element.shadowRoot?.querySelector('.select__listbox') as HTMLElement;
      expect(listbox?.hidden).to.equal(false);

      // Click the outside of the select.
      document.body.click();
      expect(element.open).to.equal(false);
    });
  });

  describe('when select is not multiple', () => {
    it('should select the option when click it', async () => {
      const element = await fixture<BSelect>(html`
        <b-select>
          <b-select-option value="apple">Apple</b-select-option>
          <b-select-option value="banana">Banana</b-select-option>
          <b-select-option value="orange">Orange</b-select-option>
        </b-select>
      `);
      // open the listbox
      const selector = element.shadowRoot?.querySelector('.select__selector') as HTMLElement;
      selector.click();
      await element.updateComplete;
      expect(element.open).to.equal(true);

      const option = element.querySelector('b-select-option') as BSelectOption;
      option.click();
      expect(element.value).to.equal('apple');
      expect(element.open).to.equal(false);

      // Click another option.
      const option2 = element.querySelectorAll('b-select-option')[1] as BSelectOption;
      option2.click();
      expect(element.value).to.equal('banana');

      // Click same option again.
      option2.click();
      expect(element.value).to.equal('banana');
    });

    it('should not change the value when click a disabled option', async () => {
      const element = await fixture<BSelect>(html`
        <b-select>
          <b-select-option value="apple">Apple</b-select-option>
          <b-select-option value="banana" disabled>Banana</b-select-option>
          <b-select-option value="orange">Orange</b-select-option>
        </b-select>
      `);
      const availableOption = element.querySelector('b-select-option') as BSelectOption;
      const disabledOption = element.querySelectorAll('b-select-option')[1] as BSelectOption;

      availableOption.click();
      expect(element.value).to.equal('apple');

      // open the listbox
      const selector = element.shadowRoot?.querySelector('.select__selector') as HTMLElement;
      selector.click();
      await element.updateComplete;
      expect(element.open).to.equal(true);

      disabledOption.click();
      expect(element.value).to.equal('apple');
      expect(element.open).to.equal(true);
    });
  });

  describe('when select is multiple', () => {
    it('should correctly convert the value to array', async () => {
      const element = await fixture<BSelect>(html` <b-select multiple value="test test2"></b-select> `);
      // string attribute will be converted to array at _willUpdate().
      await element.updateComplete;

      expect(element.value).to.deep.equal(['test', 'test2']);

      // default value
      const element2 = await fixture<BSelect>(html` <b-select multiple default-value="test test2"></b-select> `);
      await element2.updateComplete;

      expect(element2.value).to.deep.equal(['test', 'test2']);
    });

    it('should select the option when click it', async () => {
      const element = await fixture<BSelect>(html`
        <b-select multiple>
          <b-select-option value="apple">Apple</b-select-option>
          <b-select-option value="banana">Banana</b-select-option>
          <b-select-option value="orange">Orange</b-select-option>
        </b-select>
      `);
      // open the listbox
      const selector = element.shadowRoot?.querySelector('.select__selector') as HTMLElement;
      selector.click();
      await element.updateComplete;
      expect(element.open).to.equal(true);

      const option = element.querySelector('b-select-option') as BSelectOption;
      option.click();
      expect(element.value).to.deep.equal(['apple']);
      expect(element.open).to.equal(true);

      // Click another option.
      const option2 = element.querySelectorAll('b-select-option')[1] as BSelectOption;
      option2.click();
      expect(element.value).to.deep.equal(['apple', 'banana']);

      // Click same option again.
      option2.click();
      expect(element.value).to.deep.equal(['apple']);
    });

    it('should not change the value when click a disabled option', async () => {
      const element = await fixture<BSelect>(html`
        <b-select multiple>
          <b-select-option value="apple">Apple</b-select-option>
          <b-select-option value="banana" disabled>Banana</b-select-option>
          <b-select-option value="orange">Orange</b-select-option>
        </b-select>
      `);
      const availableOption = element.querySelector('b-select-option') as BSelectOption;
      const disabledOption = element.querySelectorAll('b-select-option')[1] as BSelectOption;

      availableOption.click();
      expect(element.value).to.deep.equal(['apple']);

      // open the listbox
      const selector = element.shadowRoot?.querySelector('.select__selector') as HTMLElement;
      selector.click();
      await element.updateComplete;
      expect(element.open).to.equal(true);

      disabledOption.click();
      expect(element.value).to.deep.equal(['apple']);
      expect(element.open).to.equal(true);
    });

    it('should correctly render the selected options', async () => {
      const element = await fixture<BSelect>(html`
        <b-select multiple value="apple banana">
          <b-select-option value="apple">Apple</b-select-option>
          <b-select-option value="banana">Banana</b-select-option>
          <b-select-option value="orange">Orange</b-select-option>
        </b-select>
      `);

      // Open the listbox.
      const selector = element.shadowRoot?.querySelector('.select__selector') as HTMLElement;
      selector.click();
      await element.updateComplete;

      const multipleOptionsContainer = element.shadowRoot?.querySelector(
        '.select-selector__multiple-options-container',
      ) as HTMLElement;
      expect(multipleOptionsContainer?.children.length).to.equal(2);

      // Should remove the option when click the close icon on multiple option.
      const closeIconOnMultipleOption1 = multipleOptionsContainer?.children[0].querySelector(
        '.select-selector__multiple-option-close',
      ) as HTMLElement;
      closeIconOnMultipleOption1.click();
      await element.updateComplete;
      expect(element.value).to.deep.equal(['banana']);
      expect(multipleOptionsContainer?.children.length).to.equal(1);

      // Listbox should still be open.
      expect(element.open).to.equal(true);

      // Click the selector again, then the listbox should be closed.
      selector.click();
      expect(element.open).to.equal(false);
    });
  });

  describe('when select is disabled', () => {
    it('should not open the listbox when click the selector', async () => {
      const element = await fixture<BSelect>(html`
        <b-select disabled>
          <b-select-option value="apple">Apple</b-select-option>
          <b-select-option value="banana">Banana</b-select-option>
          <b-select-option value="orange">Orange</b-select-option>
        </b-select>
      `);
      const selector = element.shadowRoot?.querySelector('.select__selector') as HTMLElement;
      selector.click();
      await element.updateComplete;
      expect(element.open).to.equal(false);
    });

    it('should close the listbox when disabled the select', async () => {
      const element = await fixture<BSelect>(html`
        <b-select>
          <b-select-option value="apple">Apple</b-select-option>
          <b-select-option value="banana">Banana</b-select-option>
          <b-select-option value="orange">Orange</b-select-option>
        </b-select>
      `);
      const selector = element.shadowRoot?.querySelector('.select__selector') as HTMLElement;
      selector.click();
      await element.updateComplete;
      expect(element.open).to.equal(true);

      element.disabled = true;
      await element.updateComplete;
      expect(element.open).to.equal(false);
    });
  });

  it('should render the correct placeholder', async () => {
    const element = await fixture<BSelect>(html`
      <b-select placeholder="placeholder">
        <b-select-option value="apple">Apple</b-select-option>
        <b-select-option value="banana">Banana</b-select-option>
        <b-select-option value="orange">Orange</b-select-option>
      </b-select>
    `);
    const placeholder = element.shadowRoot?.querySelector('.select-selector__placeholder') as HTMLElement;
    expect(placeholder).to.exist;
    expect(placeholder.textContent).to.equal('placeholder');
  });

  it('should render the correct size', async () => {
    const element = await fixture<BSelect>(html`
      <b-select size="small">
        <b-select-option value="apple">Apple</b-select-option>
        <b-select-option value="banana">Banana</b-select-option>
        <b-select-option value="orange">Orange</b-select-option>
      </b-select>
    `);
    const selector = element.shadowRoot?.querySelector('.select__selector') as HTMLElement;
    expect(selector).to.exist;
    expect(selector.classList.contains('select__selector--small')).to.equal(true);

    element.size = 'medium';
    await element.updateComplete;
    expect(selector.classList.contains('select__selector--medium')).to.equal(true);
  });

  describe('when select is clearable', () => {
    it('should render the clear icon', async () => {
      const element = await fixture<BSelect>(html`
        <b-select clearable>
          <b-select-option value="apple">Apple</b-select-option>
          <b-select-option value="banana">Banana</b-select-option>
          <b-select-option value="orange">Orange</b-select-option>
        </b-select>
      `);
      const clearIcon = element.shadowRoot?.querySelector('.clear-icon-container');
      expect(clearIcon).to.exist;
    });

    it('should clear the value when click the clear icon', async () => {
      const element = await fixture<BSelect>(html`
        <b-select clearable value="apple">
          <b-select-option value="apple">Apple</b-select-option>
          <b-select-option value="banana">Banana</b-select-option>
          <b-select-option value="orange">Orange</b-select-option>
        </b-select>
      `);
      element.open = true;
      const clearIcon = element.shadowRoot?.querySelector('.clear-icon-container');
      // mouse event
      clearIcon.dispatchEvent(new MouseEvent('click'));
      expect(element.value).to.equal('');
      // should close the listbox.
      expect(element.open).to.equal(false);

      // Multiple select.
      const multipleElement = await fixture<BSelect>(html`
        <b-select clearable multiple value="apple banana">
          <b-select-option value="apple">Apple</b-select-option>
          <b-select-option value="banana">Banana</b-select-option>
          <b-select-option value="orange">Orange</b-select-option>
        </b-select>
      `);
      multipleElement.open = true;
      const multipleClearIcon = multipleElement.shadowRoot?.querySelector('.clear-icon-container');
      multipleClearIcon.dispatchEvent(new MouseEvent('click'));
      expect(multipleElement.value).to.deep.equal([]);
      // should close the listbox.
      expect(multipleElement.open).to.equal(false);
    });

    it('should not hide the listbox when click the clear icon if no-hide-on-clear is true', async () => {
      const element = await fixture<BSelect>(html`
        <b-select clearable no-hide-on-clear value="apple">
          <b-select-option value="apple">Apple</b-select-option>
          <b-select-option value="banana">Banana</b-select-option>
          <b-select-option value="orange">Orange</b-select-option>
        </b-select>
      `);
      element.open = true;
      const clearIcon = element.shadowRoot?.querySelector('.clear-icon-container');
      clearIcon.dispatchEvent(new MouseEvent('click'));
      expect(element.open).to.equal(true);
    });
  });

  describe('when select is default open', () => {
    it('should open the listbox when rendered', async () => {
      const element = await fixture<BSelect>(html`
        <b-select default-open>
          <b-select-option value="apple">Apple</b-select-option>
          <b-select-option value="banana">Banana</b-select-option>
          <b-select-option value="orange">Orange</b-select-option>
        </b-select>
      `);
      expect(element.open).to.equal(true);
    });

    it('should not open the listbox when rendered if disabled', async () => {
      const element = await fixture<BSelect>(html`
        <b-select default-open disabled>
          <b-select-option value="apple">Apple</b-select-option>
          <b-select-option value="banana">Banana</b-select-option>
          <b-select-option value="orange">Orange</b-select-option>
        </b-select>
      `);
      expect(element.open).to.equal(false);
    });
  });

  describe('default filter', () => {
    it('filter input should be hidden when filter is false', async () => {
      const element = await fixture<BSelect>(html`
        <b-select>
          <b-select-option value="apple">Apple</b-select-option>
          <b-select-option value="banana">Banana</b-select-option>
          <b-select-option value="orange">Orange</b-select-option>
        </b-select>
      `);
      const filterInput = element.shadowRoot?.querySelector('.select-selector__filter') as HTMLInputElement;
      expect(filterInput).to.not.exist;
    });

    it('filter input should be shown when filter is true', async () => {
      const element = await fixture<BSelect>(html`
        <b-select filter>
          <b-select-option value="apple">Apple</b-select-option>
          <b-select-option value="banana">Banana</b-select-option>
          <b-select-option value="orange">Orange</b-select-option>
        </b-select>
      `);
      const filterInput = element.shadowRoot?.querySelector('.select-selector__filter') as HTMLInputElement;
      expect(filterInput).to.exist;
    });

    it('should filter the options when input in the filter input', async () => {
      const element = await fixture<BSelect>(html`
        <b-select filter>
          <b-select-option value="apple">Apple</b-select-option>
          <b-select-option value="banana">Banana</b-select-option>
          <b-select-option value="orange">Orange</b-select-option>
          <b-select-option value="pear">Pear</b-select-option>
        </b-select>
      `);
      const filterInput = element.shadowRoot?.querySelector('.select-selector__filter') as HTMLInputElement;

      // Lower case
      filterInput.value = 'apple';
      filterInput.dispatchEvent(new Event('input'));

      await element.updateComplete;

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const options = new Array(...element.querySelectorAll('b-select-option')).filter(
        (option) => !option.hasAttribute('data-filter-hidden'),
      ) as BSelectOption[];
      expect(options.length).to.equal(1);
      expect(options[0].value).to.equal('apple');

      // Upper case
      filterInput.value = 'APPLE';
      filterInput.dispatchEvent(new Event('input'));

      await element.updateComplete;

      const options2 = new Array(...element.querySelectorAll('b-select-option')).filter(
        (option) => !option.hasAttribute('data-filter-hidden'),
      ) as BSelectOption[];

      expect(options2.length).to.equal(1);
      expect(options2[0].value).to.equal('apple');

      // Partial match
      filterInput.value = 'p';
      filterInput.dispatchEvent(new Event('input'));

      await element.updateComplete;

      const options3 = new Array(...element.querySelectorAll('b-select-option')).filter(
        (option) => !option.hasAttribute('data-filter-hidden'),
      ) as BSelectOption[];

      expect(options3.length).to.equal(2);
      expect(options3[0].value).to.equal('apple');
      expect(options3[1].value).to.equal('pear');

      // No match
      filterInput.value = 'not exist';
      filterInput.dispatchEvent(new Event('input'));

      await element.updateComplete;

      const options4 = new Array(...element.querySelectorAll('b-select-option')).filter(
        (option) => !option.hasAttribute('data-filter-hidden'),
      ) as BSelectOption[];

      expect(options4.length).to.equal(0);

      // Empty string
      filterInput.value = '';
      filterInput.dispatchEvent(new Event('input'));

      await element.updateComplete;

      const options5 = new Array(...element.querySelectorAll('b-select-option')).filter(
        (option) => !option.hasAttribute('data-filter-hidden'),
      ) as BSelectOption[];

      expect(options5.length).to.equal(4);
    });

    it('shoule reset the filter input when clear the value', async () => {
      const element = await fixture<BSelect>(html`
        <b-select filter value="apple" clearable>
          <b-select-option value="apple">Apple</b-select-option>
          <b-select-option value="banana">Banana</b-select-option>
          <b-select-option value="orange">Orange</b-select-option>
          <b-select-option value="pear">Pear</b-select-option>
        </b-select>
      `);
      const filterInput = element.shadowRoot?.querySelector('.select-selector__filter') as HTMLInputElement;

      filterInput.value = 'apple';
      filterInput.dispatchEvent(new Event('input'));

      await element.updateComplete;

      const clearIcon = element.shadowRoot?.querySelector('.clear-icon-container');
      clearIcon.dispatchEvent(new MouseEvent('click'));

      await element.updateComplete;

      expect(filterInput.value).to.equal('');
    });

    it('should focus the filter input when open the listbox and reset the filter input when close the listbox', async () => {
      const element = await fixture<BSelect>(html`
        <b-select filter>
          <b-select-option value="apple">Apple</b-select-option>
          <b-select-option value="banana">Banana</b-select-option>
          <b-select-option value="orange">Orange</b-select-option>
          <b-select-option value="pear">Pear</b-select-option>
        </b-select>
      `);
      const filterInput = element.shadowRoot?.querySelector('.select-selector__filter') as HTMLInputElement;
      const spy = sinon.spy(filterInput, 'focus');

      // Open the listbox
      const selector = element.shadowRoot?.querySelector('.select__selector') as HTMLElement;
      selector.click();

      // Await the animation
      await new Promise((resolve) => setTimeout(resolve, 300));
      expect(spy.calledOnce).to.equal(true);

      filterInput.value = 'apple';
      filterInput.dispatchEvent(new Event('input'));

      await element.updateComplete;

      // Close the listbox
      document.body.click();
      // Await the animation
      await new Promise((resolve) => setTimeout(resolve, 300));
      expect(filterInput.value).to.equal('');

      const options = new Array(...element.querySelectorAll('b-select-option')).filter(
        (option) => !option.hasAttribute('data-filter-hidden'),
      ) as BSelectOption[];

      expect(options.length).to.equal(4);
    });

    // it('should show the no options message when no option matches the filter', async () => {
    //   const element = await fixture<BSelect>(html`
    //     <b-select filter>
    //       <b-select-option value="apple">Apple</b-select-option>
    //       <b-select-option value="banana">Banana</b-select-option>
    //       <b-select-option value="orange">Orange</b-select-option>
    //     </b-select>
    //   `);
    //   const filterInput = element.shadowRoot?.querySelector('.select-selector__filter') as HTMLInputElement;
    //   filterInput.value = 'not exist';
    //   filterInput.dispatchEvent(new Event('input'));

    //   const noOptionsMessage = element.shadowRoot?.querySelector('.select__no-options-message') as HTMLElement;
    //   expect(noOptionsMessage).to.exist;
    // });
  });

  // todo: keyboard event tests

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
