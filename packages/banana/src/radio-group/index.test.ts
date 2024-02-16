import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import BRadioGroup from '.';
import BRadio from '../radio';

describe('b-radio-group', () => {
  it('accessibility tests', async () => {
    const element = await fixture<BRadioGroup>(html`
      <b-radio-group value="1">
        <b-radio value="1">1</b-radio>
        <b-radio value="2">2</b-radio>
        <b-radio value="3">3</b-radio>
      </b-radio-group>
    `);
    await expect(element).to.be.accessible();
  });

  it('when provided no parameters', async () => {
    const element = await fixture<BRadioGroup>(html`
      <b-radio-group>
        <b-radio>1</b-radio>
        <b-radio>2</b-radio>
        <b-radio>3</b-radio>
      </b-radio-group>
    `);
    expect(element.value).to.equal('');
    expect(element.defaultValue).to.equal('');
    expect(element.disabled).to.equal(false);
    expect(element.required).to.equal(false);
    expect(element.controlled).to.equal(false);
    expect(element.form).to.equal(undefined);
    expect(element.name).to.equal('');
    expect(element.readonly).to.equal(false);
    expect(element.vertical).to.equal(false);
    // expect(element.size).to.equal('medium');

    expect(element.querySelectorAll('b-radio').length).to.equal(3);

    element.querySelectorAll('b-radio').forEach((radio) => {
      expect((radio as BRadio).checked).to.equal(false);
    });
  });

  describe('when provided parameters', async () => {
    const element = await fixture<BRadioGroup>(html`
      <b-radio-group value="2" default-value="1" disabled required controlled name="test" readonly vertical form="test">
        <b-radio value="1">1</b-radio>
        <b-radio value="2">2</b-radio>
        <b-radio value="3">3</b-radio>
      </b-radio-group>
    `);

    it('should have correct parameters', async () => {
      const radioGroup = await fixture<BRadioGroup>(element);
      expect(radioGroup.value).to.equal('2');
      expect(radioGroup.defaultValue).to.equal('1');
      expect(radioGroup.disabled).to.equal(true);
      expect(radioGroup.required).to.equal(true);
      expect(radioGroup.controlled).to.equal(true);
      expect(radioGroup.form).to.equal('test');
      expect(radioGroup.name).to.equal('test');
      expect(radioGroup.readonly).to.equal(true);
      expect(radioGroup.vertical).to.equal(true);
    });
  });

  describe('when put radio items in the slot', async () => {
    const element = await fixture<BRadioGroup>(html`
      <b-radio-group value="apple">
        <b-radio value="apple">Apple</b-radio>
        <b-radio value="banana">Banana</b-radio>
        <b-radio value="cherry">Cherry</b-radio>
      </b-radio-group>
    `);

    it('radio items should exist in the light DOM', () => {
      const radios = element.querySelectorAll('b-radio');
      expect(radios.length).to.equal(3);
    });

    it('radio item should be checked when its value is equal to the radio-group value', async () => {
      const radios = element.querySelectorAll('b-radio');
      expect((radios[0] as BRadio).checked).to.equal(true);
      expect((radios[1] as BRadio).checked).to.equal(false);
      expect((radios[2] as BRadio).checked).to.equal(false);

      element.value = 'banana';
      await element.updateComplete;

      expect((radios[0] as BRadio).checked).to.equal(false);
      expect((radios[1] as BRadio).checked).to.equal(true);
      expect((radios[2] as BRadio).checked).to.equal(false);
    });

    it('radio item should be checked when clicked', async () => {
      const radios = element.querySelectorAll('b-radio');
      const spy = sinon.spy();
      element.addEventListener('change', spy);

      (radios[2] as BRadio).click();
      await element.updateComplete;

      expect((radios[0] as BRadio).checked).to.equal(false);
      expect((radios[1] as BRadio).checked).to.equal(false);
      expect((radios[2] as BRadio).checked).to.equal(true);

      expect(spy.calledOnce).to.equal(true);
    });
  });

  describe('default value', () => {
    it('value should be the default value when the value is not provided', async () => {
      const element = await fixture<BRadioGroup>(html`
        <b-radio-group default-value="banana">
          <b-radio value="apple">Apple</b-radio>
          <b-radio value="banana">Banana</b-radio>
          <b-radio value="cherry">Cherry</b-radio>
        </b-radio-group>
      `);
      expect(element.value).to.equal('banana');
    });

    it('value should be the default value when the value is empty', async () => {
      const element = await fixture<BRadioGroup>(html`
        <b-radio-group value="" default-value="banana">
          <b-radio value="apple">Apple</b-radio>
          <b-radio value="banana">Banana</b-radio>
          <b-radio value="cherry">Cherry</b-radio>
        </b-radio-group>
      `);
      expect(element.value).to.equal('banana');
    });

    it('value should not be the default value when the value is provided', async () => {
      const element = await fixture<BRadioGroup>(html`
        <b-radio-group value="apple" default-value="banana">
          <b-radio value="apple">Apple</b-radio>
          <b-radio value="banana">Banana</b-radio>
          <b-radio value="cherry">Cherry</b-radio>
        </b-radio-group>
      `);
      expect(element.value).to.equal('apple');
    });
  });

  describe('controlled', () => {
    it('should not change the value, but emit change event when it is controlled', async () => {
      const element = await fixture<BRadioGroup>(html`
        <b-radio-group value="apple" controlled>
          <b-radio value="apple">Apple</b-radio>
          <b-radio value="banana">Banana</b-radio>
          <b-radio value="cherry">Cherry</b-radio>
        </b-radio-group>
      `);

      const spy = sinon.spy();
      element.addEventListener('change', spy);

      const radios = element.querySelectorAll('b-radio');
      (radios[2] as BRadio).click();

      await element.updateComplete;
      expect(element.value).to.equal('apple');
      expect(spy.calledOnce).to.equal(true);
    });

    it('should change the value when it is not controlled', async () => {
      const element = await fixture<BRadioGroup>(html`
        <b-radio-group value="apple">
          <b-radio value="apple">Apple</b-radio>
          <b-radio value="banana">Banana</b-radio>
          <b-radio value="cherry">Cherry</b-radio>
        </b-radio-group>
      `);

      const spy = sinon.spy();
      element.addEventListener('change', spy);

      const radios = element.querySelectorAll('b-radio');
      (radios[2] as BRadio).click();

      await element.updateComplete;
      expect(element.value).to.equal('cherry');
      expect(spy.calledOnce).to.equal(true);
    });
  });

  describe('disabled', () => {
    it('should not change the value when it is disabled', async () => {
      const element = await fixture<BRadioGroup>(html`
        <b-radio-group value="apple" disabled>
          <b-radio value="apple">Apple</b-radio>
          <b-radio value="banana">Banana</b-radio>
          <b-radio value="cherry">Cherry</b-radio>
        </b-radio-group>
      `);

      const spy = sinon.spy();
      element.addEventListener('change', spy);

      const radios = element.querySelectorAll('b-radio');
      (radios[2] as BRadio).click();

      await element.updateComplete;
      expect(element.value).to.equal('apple');
      expect(spy.called).to.equal(false);
    });

    it('should not change the value when the radio is disabled', async () => {
      const element = await fixture<BRadioGroup>(html`
        <b-radio-group value="apple">
          <b-radio value="apple">Apple</b-radio>
          <b-radio value="banana" disabled>Banana</b-radio>
          <b-radio value="cherry">Cherry</b-radio>
        </b-radio-group>
      `);

      const spy = sinon.spy();
      element.addEventListener('change', spy);

      const radios = element.querySelectorAll('b-radio');
      (radios[1] as BRadio).click();

      await element.updateComplete;
      expect(element.value).to.equal('apple');
      expect(spy.called).to.equal(false);
    });
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
