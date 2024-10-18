import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys, sendMouse } from '@web/test-runner-commands';
import sinon from 'sinon';
import BTextarea from '.';

describe('b-textarea', () => {
  it('accessibility tests', async () => {
    const element = await fixture<BTextarea>(html`<b-textarea></b-textarea>`);
    await expect(element).to.be.accessible({ ignoredRules: ['label'] });
  });

  describe('when provided no parameters', async () => {
    const element = await fixture<BTextarea>(html`<b-textarea></b-textarea>`);

    it('should have correct default values', () => {
      expect(element.name).to.equal('');
      expect(element.value).to.equal('');
      expect(element.size).to.equal('medium');
      expect(element.placeholder).to.equal(undefined);
      expect(element.rows).to.equal(4);
      expect(element.minlength).to.equal(undefined);
      expect(element.maxlength).to.equal(undefined);
      expect(element.autocapitalize).to.equal('off');
      expect(element.autocorrect).to.equal('on');
      expect(element.spellcheck).to.equal(true);
      expect(element.inputmode).to.equal('text');
      expect(element.autofocus).to.equal(false);
      expect(element.disabled).to.equal(false);
      expect(element.required).to.equal(false);
      expect(element.readonly).to.equal(false);
      expect(element.controlled).to.equal(false);
    });

    it('should have validation methods', () => {
      expect(element.reportValidity).to.be.a('function');
      expect(element.checkValidity).to.be.a('function');
    });
  });

  describe('when provided parameters', async () => {
    const element = await fixture<BTextarea>(
      html`<b-textarea
        name="test"
        value="test"
        size="small"
        placeholder="test"
        rows="2"
        minlength="1"
        maxlength="10"
        autocapitalize="sentences"
        autocorrect="off"
        spellcheck="false"
        inputmode="search"
        ?autofocus=${true}
        disabled
        required
        readonly
        controlled
      ></b-textarea>`,
    );

    it('should have correct values', () => {
      expect(element.name).to.equal('test');
      expect(element.value).to.equal('test');
      expect(element.size).to.equal('small');
      expect(element.placeholder).to.equal('test');
      expect(element.rows).to.equal(2);
      expect(element.minlength).to.equal(1);
      expect(element.maxlength).to.equal(10);
      expect(element.autocapitalize).to.equal('sentences');
      expect(element.autocorrect).to.equal('off');
      expect(element.spellcheck).to.equal(false);
      expect(element.inputmode).to.equal('search');
      expect(element.autofocus).to.equal(true);
      expect(element.disabled).to.equal(true);
      expect(element.required).to.equal(true);
      expect(element.readonly).to.equal(true);
      expect(element.controlled).to.equal(true);
    });
  });

  describe('when the value changes', () => {
    it('should emit change and input when the user types in the textarea', async () => {
      const element = await fixture<BTextarea>(html` <b-textarea></b-textarea> `);
      const wrapper = element.shadowRoot!.querySelector('.textarea__wrapper') as HTMLElement;
      const spy = sinon.spy();

      element.addEventListener('change', spy);

      wrapper.click();
      await element.updateComplete;
      await sendKeys({ type: 'abc' });

      expect(spy.calledThrice).to.equal(true);
    });

    it('should not emit change or input when the value is set programmatically', async () => {
      const element = await fixture<BTextarea>(html` <b-textarea></b-textarea> `);

      element.addEventListener('change', () => expect.fail('sl-change should not be emitted'));
      element.value = 'abc';

      await element.updateComplete;
    });
  });

  describe('values synchronization', () => {
    it('the value of b-textarea should be updated when the value of native input changes', async () => {
      const element = await fixture<BTextarea>(html`<b-textarea></b-textarea>`);
      const textarea = element.shadowRoot!.querySelector('textarea') as HTMLTextAreaElement;
      textarea.value = 'test';
      textarea.dispatchEvent(new Event('input'));
      element.blur();
      expect(element.value).to.equal('test');
    });

    it('the value of native input should be updated when the value of b-textarea changes', async () => {
      const element = await fixture<BTextarea>(html`<b-textarea></b-textarea>`);
      const textarea = element.shadowRoot!.querySelector('textarea') as HTMLTextAreaElement;
      element.value = 'test';
      await element.updateComplete;
      expect(textarea.value).to.equal('test');
    });
  });

  describe('validation', () => {
    it('should be valid when the value is empty and the input is not required', async () => {
      const element = await fixture<BTextarea>(html`<b-textarea></b-textarea>`);
      expect(element.checkValidity()).to.equal(true);
      expect(element.reportValidity()).to.equal(true);
    });

    it('should be invalid when the value is empty and the input is required', async () => {
      const element = await fixture<BTextarea>(html`<b-textarea required></b-textarea>`);
      expect(element.checkValidity()).to.equal(false);
      expect(element.reportValidity()).to.equal(false);
    });

    it('should be valid when the value is not empty and the input is required', async () => {
      const element = await fixture<BTextarea>(html`<b-textarea required value="test"></b-textarea>`);
      expect(element.checkValidity()).to.equal(true);
      expect(element.reportValidity()).to.equal(true);
    });

    it('should not check when the input is disabled', async () => {
      const element = await fixture<BTextarea>(html`<b-textarea disabled required></b-textarea>`);
      expect(element.checkValidity()).to.equal(true);
      expect(element.reportValidity()).to.equal(true);
    });
  });
});

it('should focus the native input when click the wrapper', async () => {
  const element = await fixture<BTextarea>(html`<b-textarea></b-textarea>`);
  const textarea = element.shadowRoot!.querySelector('textarea') as HTMLTextAreaElement;
  const wrapper = element.shadowRoot!.querySelector('.textarea__wrapper') as HTMLElement;
  const focusSpy = sinon.spy();
  textarea.addEventListener('focus', focusSpy);
  wrapper.click();
  await element.updateComplete;
  expect(focusSpy.calledOnce).to.equal(true);
  expect(wrapper.classList.contains('textarea__wrapper--focusing')).to.equal(true);
  await sendKeys({ press: 'a' });
  console.log('document.activeElement', document.activeElement);
  console.log('textarea', textarea.value, element.value);

  expect(element.value).to.equal('a');
  expect(textarea.value).to.equal('a');
});

describe('events', () => {
  it('should emit the change event when user input', async () => {
    const element = await fixture<BTextarea>(html`<b-textarea></b-textarea>`);
    const wrapper = element.shadowRoot!.querySelector('.textarea__wrapper') as HTMLElement;
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
    const element = await fixture<BTextarea>(html`<b-textarea></b-textarea>`);
    const wrapper = element.shadowRoot!.querySelector('.textarea__wrapper') as HTMLElement;
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
    const element = await fixture<BTextarea>(html`<b-textarea></b-textarea>`);
    const wrapper = element.shadowRoot!.querySelector('.textarea__wrapper') as HTMLElement;
    const spy = sinon.spy();
    element.addEventListener('focus', spy);

    wrapper.click();
    await element.updateComplete;

    expect(spy.calledOnce).to.equal(true);
  });

  it('should emit the blur event when the input is blurred', async () => {
    const element = await fixture<BTextarea>(html`<b-textarea></b-textarea>`);
    const wrapper = element.shadowRoot!.querySelector('.textarea__wrapper') as HTMLElement;
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
  it('a native form should be able to get the value of b-textarea', async () => {
    const element = await fixture<HTMLFormElement>(html`<form>
      <b-textarea name="test" value="test"></b-textarea>
    </form>`);

    // Should get correct form data.
    const formData = new FormData(element);
    expect(formData.get('test')).to.equal('test');
  });

  it('should not submit the form when the input is invalid', async () => {
    const element = await fixture<HTMLFormElement>(html`<form>
      <b-textarea name="test" required></b-textarea>
      <button type="submit">Submit</button>
    </form>`);
    const textarea = element.querySelector('b-textarea') as BTextarea;
    const button = element.querySelector('button') as HTMLButtonElement;
    const spy = sinon.spy();
    element.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      spy(event);
    });

    const wrapper = textarea.shadowRoot!.querySelector('.textarea__wrapper') as HTMLElement;
    wrapper.click();
    await textarea.updateComplete;

    button.click();
    expect(spy.called).to.equal(false);

    // Then make it not empty.
    await sendKeys({ press: 'a' });
    button.click();
    // It should submit the form now.
    expect(spy.calledOnce).to.equal(true);
  });

  it('should be valid and submit the form when a required input is disabled', async () => {
    const element = await fixture<HTMLFormElement>(html`<form
      @submit=${(event: Event) => {
        event.preventDefault();
      }}
    >
      <b-textarea name="test" required disabled></b-textarea>
      <button type="submit">Submit</button>
    </form>`);
    const spy = sinon.spy();
    element.addEventListener('submit', spy);

    const button = element.querySelector('button') as HTMLButtonElement;
    button.click();
    expect(spy.calledOnce).to.equal(true);
  });

  it('should be valid and submit the form when a required input is empty and the form is novaalidate', async () => {
    const element = await fixture<HTMLFormElement>(html`<form novalidate>
      <b-textarea name="test" required></b-textarea>
      <button type="submit">Submit</button>
    </form>`);
    const textarea = element.querySelector('b-textarea') as BTextarea;
    const button = element.querySelector('button') as HTMLButtonElement;

    const spy = sinon.spy();
    element.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      spy(event);
    });

    const wrapper = textarea.shadowRoot!.querySelector('.textarea__wrapper') as HTMLElement;
    wrapper.click();
    await textarea.updateComplete;

    button.click();
    expect(spy.calledOnce).to.equal(true);
  });
});

describe('size', () => {
  it('should have correct size class', async () => {
    const element = await fixture<BTextarea>(html`<b-textarea></b-textarea>`);
    const wrapper = element.shadowRoot!.querySelector('.textarea__wrapper') as HTMLElement;
    expect(wrapper.classList.contains('textarea__wrapper--medium')).to.equal(true);

    element.size = 'small';
    await element.updateComplete;
    expect(wrapper.classList.contains('textarea__wrapper--small')).to.equal(true);

    element.size = 'large';
    await element.updateComplete;
    expect(wrapper.classList.contains('textarea__wrapper--large')).to.equal(true);
  });
});

describe('controlled', () => {
  it('should not change the value when the input is controlled', async () => {
    const element = await fixture<BTextarea>(html`<b-textarea controlled></b-textarea>`);
    const textarea = element.shadowRoot!.querySelector('textarea') as HTMLTextAreaElement;
    textarea.focus();
    await sendKeys({ press: 'a' });
    expect(element.value).to.equal('');
    expect(textarea.value).to.equal('');
  });

  it('should emit the change event correctly when the input is controlled', async () => {
    const element = await fixture<BTextarea>(html`<b-textarea value="b" controlled></b-textarea>`);
    const textarea = element.shadowRoot!.querySelector('textarea') as HTMLTextAreaElement;
    const spy = sinon.spy();
    element.addEventListener('change', spy);

    textarea.focus();
    await sendKeys({ press: 'a' });
    expect(spy.calledOnce).to.equal(true);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(spy.firstCall.args[0].detail.value).to.equal('ba');
    expect(element.value).to.equal('b');
    expect(textarea.value).to.equal('b');

    // Then change the attribute.
    element.setAttribute('value', 'c');
    await element.updateComplete;
    expect(element.value).to.equal('c');
    expect(textarea.value).to.equal('c');
  });

  it('should dispatch the change event and not change the value when a form is reset', async () => {
    const element = await fixture<HTMLFormElement>(html`
      <form>
        <b-textarea value="b" controlled></b-textarea>
      </form>
    `);
    const input = element.querySelector('b-textarea') as BTextarea;
    const textarea = input.shadowRoot!.querySelector('textarea') as HTMLTextAreaElement;
    const spy = sinon.spy();
    input.addEventListener('change', spy);

    // Reset the form.
    element.reset();
    await element.updateComplete;
    expect(spy.calledOnce).to.equal(true);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(spy.firstCall.args[0].detail.value).to.equal('');
    expect(input.value).to.equal('b');
    expect(textarea.value).to.equal('b');
  });
});
