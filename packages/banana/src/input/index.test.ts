import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys, sendMouse } from '@web/test-runner-commands';
import sinon from 'sinon';
import BInput from '.';

describe('b-input', () => {
  it('accessibility tests', async () => {
    const element = await fixture<BInput>(html`<b-input></b-input>`);
    await expect(element).to.be.accessible({ ignoredRules: ['label'] });
  });

  describe('when provided no parameters', async () => {
    const element = await fixture<BInput>(html`<b-input></b-input>`);

    it('should have correct default values', () => {
      expect(element.name).to.equal('');
      expect(element.value).to.equal('');
      expect(element.disabled).to.equal(false);
      expect(element.placeholder).to.equal(undefined);
      expect(element.size).to.equal('medium');
      expect(element.type).to.equal('text');
      expect(element.required).to.equal(false);
      expect(element.autocomplete).to.equal(undefined);
      expect(element.pattern).to.equal(undefined);
      expect(element.minlength).to.equal(undefined);
      expect(element.maxlength).to.equal(undefined);
      expect(element.min).to.equal(undefined);
      expect(element.max).to.equal(undefined);
      expect(element.controlled).to.equal(false);
    });

    it('should have validation methods', () => {
      expect(element.reportValidity).to.be.a('function');
      expect(element.checkValidity).to.be.a('function');
    });
  });

  describe('when provided parameters', async () => {
    const element = await fixture<BInput>(
      html`<b-input
        name="test"
        value="test"
        disabled
        placeholder="test"
        size="small"
        type="password"
        required
        autocomplete="off"
        pattern="test"
        minlength="1"
        maxlength="10"
        min="1"
        max="10"
        controlled
      ></b-input>`,
    );

    it('should have correct values', () => {
      expect(element.name).to.equal('test');
      expect(element.value).to.equal('test');
      expect(element.disabled).to.equal(true);
      expect(element.placeholder).to.equal('test');
      expect(element.size).to.equal('small');
      expect(element.type).to.equal('password');
      expect(element.required).to.equal(true);
      expect(element.autocomplete).to.equal('off');
      expect(element.pattern).to.equal('test');
      expect(element.minlength).to.equal(1);
      expect(element.maxlength).to.equal(10);
      expect(element.min).to.equal('1');
      expect(element.max).to.equal('10');
      expect(element.controlled).to.equal(true);
    });
  });

  describe('values synchronization', () => {
    it('the value of b-input should be updated when the value of native input changes', async () => {
      const element = await fixture<BInput>(html`<b-input></b-input>`);
      const input = element.shadowRoot!.querySelector('input') as HTMLInputElement;
      input.value = 'test';
      input.dispatchEvent(new Event('input'));
      expect(element.value).to.equal('test');
    });

    it('the value of native input should be updated when the value of b-input changes', async () => {
      const element = await fixture<BInput>(html`<b-input></b-input>`);
      const input = element.shadowRoot!.querySelector('input') as HTMLInputElement;
      element.value = 'test';
      await element.updateComplete;
      expect(input.value).to.equal('test');
    });
  });

  describe('validation', () => {
    it('should be valid when the value is empty and the input is not required', async () => {
      const element = await fixture<BInput>(html`<b-input></b-input>`);
      expect(element.checkValidity()).to.equal(true);
      expect(element.reportValidity()).to.equal(true);
    });

    it('should be invalid when the value is empty and the input is required', async () => {
      const element = await fixture<BInput>(html`<b-input required></b-input>`);
      expect(element.checkValidity()).to.equal(false);
      expect(element.reportValidity()).to.equal(false);
    });

    it('should be valid when the value is not empty and the input is required', async () => {
      const element = await fixture<BInput>(html`<b-input required value="test"></b-input>`);
      expect(element.checkValidity()).to.equal(true);
      expect(element.reportValidity()).to.equal(true);
    });

    it('should not check when the input is disabled', async () => {
      const element = await fixture<BInput>(html`<b-input disabled required></b-input>`);
      expect(element.checkValidity()).to.equal(true);
      expect(element.reportValidity()).to.equal(true);
    });
  });
});

it('should focus the native input when click the wrapper', async () => {
  const element = await fixture<BInput>(html`<b-input></b-input>`);
  const input = element.shadowRoot!.querySelector('input') as HTMLInputElement;
  const wrapper = element.shadowRoot!.querySelector('.input__wrapper') as HTMLElement;
  const focusSpy = sinon.spy();
  input.addEventListener('focus', focusSpy);
  wrapper.click();
  await element.updateComplete;
  expect(focusSpy.calledOnce).to.equal(true);
  expect(wrapper.classList.contains('input__wrapper--focusing')).to.equal(true);
  await sendKeys({ press: 'a' });
  expect(element.value).to.equal('a');
  expect(input.value).to.equal('a');
});

describe('events', () => {
  it('should emit the change event when user input', async () => {
    const element = await fixture<BInput>(html`<b-input></b-input>`);
    const wrapper = element.shadowRoot!.querySelector('.input__wrapper') as HTMLElement;
    const spy = sinon.spy();
    element.addEventListener('change', spy);

    wrapper.click();
    await element.updateComplete;
    await sendKeys({ press: 'a' });

    expect(spy.calledOnce).to.equal(true);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(spy.firstCall.args[0].detail.value).to.equal('a');
  });

  it('should emit the change event when the value changes', async () => {
    const element = await fixture<BInput>(html`<b-input></b-input>`);
    const wrapper = element.shadowRoot!.querySelector('.input__wrapper') as HTMLElement;
    const spy = sinon.spy();
    element.addEventListener('change', spy);

    wrapper.click();
    await element.updateComplete;
    await sendKeys({ press: 'a' });

    expect(spy.calledOnce).to.equal(true);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(spy.firstCall.args[0].detail.value).to.equal('a');
  });

  it('should emit the focus event when the input is focused', async () => {
    const element = await fixture<BInput>(html`<b-input></b-input>`);
    const wrapper = element.shadowRoot!.querySelector('.input__wrapper') as HTMLElement;
    const spy = sinon.spy();
    element.addEventListener('focus', spy);

    wrapper.click();
    await element.updateComplete;

    expect(spy.calledOnce).to.equal(true);
  });

  it('should emit the blur event when the input is blurred', async () => {
    const element = await fixture<BInput>(html`<b-input></b-input>`);
    const wrapper = element.shadowRoot!.querySelector('.input__wrapper') as HTMLElement;
    const spy = sinon.spy();
    element.addEventListener('blur', spy);

    // Foucs it first.
    wrapper.click();
    await element.updateComplete;

    // Then blur it.
    await sendMouse({ type: 'click', position: [0, 0] });
    expect(spy.calledOnce).to.equal(true);

    // Will not change the value when user inputing after the input is blurred.
    await sendKeys({ press: 'a' });
    expect(element.value).to.equal('');
  });
});

describe('form', () => {
  it('a native form should be able to get the value of b-input', async () => {
    const element = await fixture<HTMLFormElement>(html`<form>
      <b-input name="test" value="test"></b-input>
    </form>`);

    // Should get correct form data.
    const formData = new FormData(element);
    expect(formData.get('test')).to.equal('test');
  });

  it('should submit the form when press Enter', async () => {
    // Prevent the jumping of the test page.
    const element = await fixture<HTMLFormElement>(html`<form
      @submit=${(event: Event) => {
        event.preventDefault();
      }}
    >
      <b-input name="test" value="test"></b-input>
    </form>`);
    const input = element.querySelector('b-input') as BInput;
    const spy = sinon.spy();
    element.addEventListener('submit', spy);

    const wrapper = input.shadowRoot!.querySelector('.input__wrapper') as HTMLElement;
    wrapper.click();
    await input.updateComplete;

    await sendKeys({ press: 'Enter' });
    expect(spy.calledOnce).to.equal(true);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(spy.firstCall.args[0].target).to.equal(element);

    // Should get correct form data.
    const formData = new FormData(element);
    expect(formData.get('test')).to.equal('test');
  });

  it('should not submit the form when the input is invalid', async () => {
    const element = await fixture<HTMLFormElement>(html`<form
      @submit=${(event: Event) => {
        event.preventDefault();
      }}
    >
      <b-input name="test" required></b-input>
    </form>`);
    const input = element.querySelector('b-input') as BInput;
    const spy = sinon.spy();
    element.addEventListener('submit', spy);

    const wrapper = input.shadowRoot!.querySelector('.input__wrapper') as HTMLElement;
    wrapper.click();
    await input.updateComplete;

    await sendKeys({ press: 'Enter' });
    expect(spy.called).to.equal(false);

    // Then make it not empty.
    await sendKeys({ press: 'a' });
    await sendKeys({ press: 'Enter' });
    // It should submit the form now.
    expect(spy.calledOnce).to.equal(true);
  });

  it('should be valid and submit the form when a required input is disabled', async () => {
    const element = await fixture<HTMLFormElement>(html`<form
      @submit=${(event: Event) => {
        event.preventDefault();
      }}
    >
      <b-input name="test" required disabled></b-input>
      <button type="submit">Submit</button>
    </form>`);
    const spy = sinon.spy();
    element.addEventListener('submit', spy);

    const button = element.querySelector('button') as HTMLButtonElement;
    button.click();
    expect(spy.calledOnce).to.equal(true);
  });

  it('should be valid and submit the form when a required input is empty and the form is novaalidate', async () => {
    const element = await fixture<HTMLFormElement>(html`<form
      @submit=${(event: Event) => {
        event.preventDefault();
      }}
      novalidate
    >
      <b-input name="test" required></b-input>
    </form>`);
    const input = element.querySelector('b-input') as BInput;
    const spy = sinon.spy();
    element.addEventListener('submit', spy);

    const wrapper = input.shadowRoot!.querySelector('.input__wrapper') as HTMLElement;
    wrapper.click();
    await input.updateComplete;

    await sendKeys({ press: 'Enter' });
    expect(spy.calledOnce).to.equal(true);
  });

  // Default value is not supported yet.
  it('should become the default value when the form is reset', async () => {
    const element = await fixture<HTMLFormElement>(html`<form>
      <b-input name="test" default-value="test"></b-input>
      <button type="reset">Reset</button>
    </form>`);
    const input = element.querySelector('b-input') as BInput;
    const button = element.querySelector('button') as HTMLButtonElement;

    // Change the value.
    input.value = 'test1';
    await input.updateComplete;
    expect(input.value).to.equal('test1');

    // Then reset it.
    button.click();
    expect(input.value).to.equal('test');
  });
});

describe('size', () => {
  it('should have correct size class', async () => {
    const element = await fixture<BInput>(html`<b-input></b-input>`);
    const wrapper = element.shadowRoot!.querySelector('.input__wrapper') as HTMLElement;
    expect(wrapper.classList.contains('input__wrapper--medium')).to.equal(true);

    element.size = 'small';
    await element.updateComplete;
    expect(wrapper.classList.contains('input__wrapper--small')).to.equal(true);

    element.size = 'large';
    await element.updateComplete;
    expect(wrapper.classList.contains('input__wrapper--large')).to.equal(true);
  });
});

describe('controlled', () => {
  it('should not change the value when the input is controlled', async () => {
    const element = await fixture<BInput>(html`<b-input controlled></b-input>`);
    const input = element.shadowRoot!.querySelector('input') as HTMLInputElement;
    input.focus();
    await sendKeys({ press: 'a' });
    expect(element.value).to.equal('');
    expect(input.value).to.equal('');
  });

  it('should emit the change event correctly when the input is controlled', async () => {
    const element = await fixture<BInput>(html`<b-input value="b" controlled></b-input>`);
    const input = element.shadowRoot!.querySelector('input') as HTMLInputElement;
    const spy = sinon.spy();
    element.addEventListener('change', spy);

    input.focus();
    await sendKeys({ press: 'a' });
    expect(spy.calledOnce).to.equal(true);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(spy.firstCall.args[0].detail.value).to.equal('ba');
    expect(element.value).to.equal('b');
    expect(input.value).to.equal('b');

    // Then change the attribute.
    element.setAttribute('value', 'c');
    await element.updateComplete;
    expect(element.value).to.equal('c');
    expect(input.value).to.equal('c');
  });

  it('should dispatch the change event and not change the value when a form is reset', async () => {
    const element = await fixture<HTMLFormElement>(html`
      <form>
        <b-input value="b" controlled></b-input>
      </form>
    `);
    const input = element.querySelector('b-input') as BInput;
    const innerInput = input.shadowRoot!.querySelector('input') as HTMLInputElement;
    const spy = sinon.spy();
    input.addEventListener('change', spy);

    // Reset the form.
    element.reset();
    await element.updateComplete;
    expect(spy.calledOnce).to.equal(true);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(spy.firstCall.args[0].detail.value).to.equal('');
    expect(input.value).to.equal('b');
    expect(innerInput.value).to.equal('b');
  });
});
