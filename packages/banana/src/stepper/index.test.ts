import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import BStepper from '.';

const ignoredRules = ['button-name', 'aria-allowed-role', 'label', 'presentation-role-conflict', 'aria-allowed-role'];

describe('b-stepper', () => {
  it('accessibility tests', async () => {
    const element = await fixture<BStepper>(html`<b-stepper></b-stepper>`);
    await expect(element).to.be.accessible({
      ignoredRules,
    });
  });
});

describe('form', () => {
  it('a native form should be able to get the value of b-stepper', async () => {
    const element = await fixture<HTMLFormElement>(html`<form>
      <b-stepper name="test" value="1"></b-stepper>
    </form>`);

    // Should get correct form data.
    const formData = new FormData(element);

    expect(formData.get('test')).to.equal('1');
  });

  it('should not submit the form when a required b-stepper is empty', async () => {
    const element = await fixture<HTMLFormElement>(html`<form
      @submit=${(event: Event) => {
        event.preventDefault();
      }}
    >
      <b-stepper name="test" required></b-stepper>
    </form>`);
    const BStepper = element.querySelector('b-stepper') as HTMLInputElement;
    const spy = sinon.spy();
    element.addEventListener('submit', spy);

    console.log(BStepper.reportValidity());

    element.requestSubmit();
    expect(spy.called).to.equal(true);

    // pass through change stepper value make it empty by js
    BStepper.value = '';
    element.requestSubmit();

    // It should submit the form now.
    expect(spy.calledOnce).to.equal(false);
  });

  it('a disabled b-stepper should not be a part of the form data, even if it has a name', async () => {
    const element = await fixture<HTMLFormElement>(html`<form
      @submit=${(event: Event) => {
        event.preventDefault();
      }}
    >
      <b-stepper name="test" disabled value="0"></b-stepper>
    </form>`);

    // Should get correct form data.
    const formData = new FormData(element);

    expect(formData.get('test')).to.equal(null);
  });

  it('should be valid and submit the form when a empty required b-stepper is disabled', async () => {
    const element = await fixture<HTMLFormElement>(html`<form
      @submit=${(event: Event) => {
        event.preventDefault();
      }}
    >
      <b-stepper name="test" required disabled></b-stepper>
    </form>`);
    const spy = sinon.spy();
    element.addEventListener('submit', spy);

    element.requestSubmit();
    expect(spy.calledOnce).to.equal(true);
  });

  it('should be valid and submit the form when a required b-stepper is empty and the form is novaalidate', async () => {
    const element = await fixture<HTMLFormElement>(html`<form
      novalidate
      @submit=${(event: Event) => {
        event.preventDefault();
      }}
    >
      <b-stepper name="test" required></b-stepper>
    </form>`);

    const BStepper = element.querySelector('b-stepper') as HTMLInputElement;
    BStepper.value = '';

    const spy = sinon.spy();
    element.addEventListener('submit', spy);

    element.requestSubmit();
    expect(spy.calledOnce).to.equal(true);
  });

  it('should become the default value when the form is reset', async () => {
    const element = await fixture<HTMLFormElement>(html`<form>
      <b-stepper name="test" value="1" default-value="0"></b-stepper>
    </form>`);
    const BStepper = element.querySelector('b-stepper') as BStepper;

    expect(BStepper.value).to.equal(1);

    element.reset();
    expect(BStepper.value).to.equal(0);
  });
});

describe('when provided no parameters', async () => {
  const element = await fixture<BStepper>(html`<b-stepper></b-stepper>`);

  it('should have correct default values', () => {
    expect(element.name).to.equal('');
    expect(element.value).to.equal(0);
    expect(element.defaultValue).to.equal(0);
    expect(element.step).to.equal(1);
    expect(element.integer).to.be.false;
    expect(element.disabled).to.equal(false);
    expect(element.required).to.equal(false);
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
  const element = await fixture<BStepper>(html`
    <b-stepper
      name="test"
      default-value="0"
      value="1"
      min="0"
      max="10"
      step="2"
      integer
      required
      readonly
      disabled
    ></b-stepper>
  `);

  it('should have correct values', () => {
    expect(element.name).to.equal('test');
    expect(element.value).to.equal(1);
    expect(element.defaultValue).to.equal(0);
    expect(element.min).to.equal(0);
    expect(element.max).to.equal(10);
    expect(element.step).to.equal(2);
    expect(element.disabled).to.equal(true);
    expect(element.required).to.equal(true);
    expect(element.readonly).to.equal(true);
    expect(element.integer).to.equal(true);
  });
});

describe('when set different input range', () => {
  it('should have available element when only transfer min attribute', async () => {
    const element = await fixture<BStepper>(html`<b-stepper min="1"></b-stepper>`);
    await expect(element).to.be.accessible({
      ignoredRules,
    });
  });

  it('should have available element when only transfer max attribute', async () => {
    const element = await fixture<BStepper>(html`<b-stepper max="5"></b-stepper>`);
    await expect(element).to.be.accessible({
      ignoredRules,
    });
  });

  it('should have available element when transfer max and min attribute', async () => {
    const element = await fixture<BStepper>(html`<b-stepper min="1" max="5"></b-stepper>`);
    await expect(element).to.be.accessible({
      ignoredRules,
    });
  });

  it('stepper content should equal min attribute when transfer value smaller than min attribute', async () => {
    const currentVal = '0';
    const minVal = '1';
    const element = await fixture<BStepper>(html`<b-stepper min=${minVal} max="5" value=${currentVal}></b-stepper>`);

    const minusBtn = element.shadowRoot?.querySelector('#minus_btn');

    expect(minusBtn?.className.includes('disabled')).to.be.true;

    element.minus();
    expect(element.value.toString()).equal(minVal);
  });

  it('stepper content should equal max attribute when transfer value larger than max attribute', async () => {
    const currentVal = '10';
    const maxVal = '5';
    const element = await fixture<BStepper>(html`<b-stepper min="1" max=${maxVal} value=${currentVal}></b-stepper>`);

    const addBtn = element.shadowRoot?.querySelector('#plus_btn');
    expect(addBtn?.className.includes('disabled')).to.be.true;

    element.plus();
    expect(element.value.toString()).equal(maxVal);
  });
});

describe('when set other step in stepper element', () => {
  it('should normal increase stepper content by use integer step increase', async () => {
    const defaultVal = '5';
    const step = '2';
    const element = await fixture<BStepper>(html`<b-stepper value=${defaultVal} step=${step}></b-stepper>`);
    const addBtn = element.shadowRoot?.querySelector('#plus_btn') as HTMLElement;

    addBtn.click();

    expect(element.value).equal(Number(defaultVal) + Number(step));
  });

  it('should normal increase stepper content by use decimal step increase', async () => {
    // Typical case of addition accuracy of decimals eg: 0.1 + 0.2 !== 0.3
    const defaultVal = '0.1';
    const step = '0.2';
    const element = await fixture<BStepper>(html`<b-stepper value=${defaultVal} step=${step}></b-stepper>`);
    const addBtn = element.shadowRoot?.querySelector('#plus_btn') as HTMLElement;

    addBtn.click();

    expect(element.value).equal(0.3);
  });

  it('should display maximum value when use step increase over the maximum', async () => {
    const defaultVal = '1';
    const step = '5';
    const maxVal = '5';

    const element = await fixture<BStepper>(
      html`<b-stepper value=${defaultVal} step=${step} max=${maxVal}></b-stepper>`,
    );
    const addBtn = element.shadowRoot?.querySelector('#plus_btn') as HTMLElement;

    addBtn.click();

    expect(element.value.toString()).equal(maxVal);
  });
});

describe('trigger change events', async () => {
  const element = await fixture<BStepper>(html`<b-stepper></b-stepper>`);

  it('should emit the change event when click add button', () => {
    const addBtn = element.shadowRoot!.querySelector('#plus_btn') as HTMLElement;
    const spy = sinon.spy();
    element.addEventListener('change', spy);

    addBtn.click();

    expect(spy.calledOnce).to.be.true;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(spy.firstCall.args[0].detail.value).to.equal(1);
  });

  it('should emit the change event when click minus button', () => {
    const minusBtn = element.shadowRoot!.querySelector('#minus_btn') as HTMLElement;
    const spy = sinon.spy();
    element.addEventListener('change', spy);

    minusBtn.click();

    expect(spy.calledOnce).to.be.true;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(spy.firstCall.args[0].detail.value).to.equal(0);
  });

  it('should emit the change event when user input integer number', async () => {
    const element = await fixture<BStepper>(html`<b-stepper></b-stepper>`);
    const bInput = element.shadowRoot!.querySelector('.stepper__input') as HTMLElement;
    const spy = sinon.spy();
    element.addEventListener('change', spy);

    const wrapper = bInput.shadowRoot!.querySelector('.input') as HTMLInputElement;

    wrapper.focus();
    await element.updateComplete;
    await sendKeys({ type: '5' });
    wrapper.blur();
    await element.updateComplete;

    expect(spy.called).to.be.true;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(Number(spy.firstCall.args[0].detail.value)).to.equal(5);
  });

  it('should emit the change event when user input decimal number', async () => {
    const element = await fixture<BStepper>(html`<b-stepper></b-stepper>`);
    const bInput = element.shadowRoot!.querySelector('.stepper__input') as HTMLElement;
    const spy = sinon.spy();
    element.addEventListener('change', spy);

    const wrapper = bInput.shadowRoot!.querySelector('.input') as HTMLInputElement;

    wrapper.focus();
    await element.updateComplete;
    await sendKeys({ type: '1.55' });
    wrapper.blur();
    await element.updateComplete;

    expect(spy.called).to.be.true;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(spy.lastCall.args[0].detail.value).to.equal(1.55);
  });

  it('should emit the change event when user input minuses', async () => {
    const element = await fixture<BStepper>(html`<b-stepper value="-5"></b-stepper>`);
    const bInput = element.shadowRoot!.querySelector('.stepper__input') as HTMLElement;
    const spy = sinon.spy();
    element.addEventListener('change', spy);

    const wrapper = bInput.shadowRoot!.querySelector('.input') as HTMLInputElement;

    wrapper.focus();
    await element.updateComplete;
    await sendKeys({ type: '2' });
    wrapper.blur();
    await element.updateComplete;

    expect(spy.called).to.be.true;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(Number(spy.firstCall.args[0].detail.value)).to.equal(-52);
  });

  it('should emit the change event when user blur and stepper content is inviable', async () => {
    const element = await fixture<BStepper>(html`<b-stepper></b-stepper>`);
    const bInput = element.shadowRoot!.querySelector('.stepper__input') as HTMLInputElement;
    const spy = sinon.spy();
    element.addEventListener('change', spy);

    const wrapper = bInput.shadowRoot!.querySelector('.input') as HTMLInputElement;

    wrapper.focus();
    await element.updateComplete;
    await sendKeys({ type: '-' });
    wrapper.blur();
    await element.updateComplete;

    expect(spy.calledOnce).to.be.true;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(Number(spy.firstCall.args[0].detail.value)).to.equal(0);
  });
});
