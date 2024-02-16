import { expect, fixture, html } from '@open-wc/testing';
import BRadio from '.';
import BRadioGroup from '../radio-group';

describe('b-radio', () => {
  it('accessibility tests', async () => {
    const element = await fixture<BRadio>(html`<b-radio></b-radio>`);
    await expect(element).to.be.accessible();
  });

  it('when provided no parameters', async () => {
    const element = await fixture<BRadioGroup>(html`<b-radio-group>
      <b-radio></b-radio>
    </b-radio-group>`);

    const radio = element.querySelector('b-radio') as BRadio;

    expect(radio.value).to.equal('');
    expect(radio.checked).to.equal(false);
    expect(radio.disabled).to.equal(false);
    expect(radio.size).to.equal('medium');

    const control = radio.shadowRoot?.querySelector('.radio__control');
    expect(control).to.not.have.class('radio__control--checked');
    expect(control).to.not.have.class('radio__control--disabled');

    expect(radio.textContent).to.equal('');
  });

  it('when provided parameters', async () => {
    const element = await fixture<BRadioGroup>(html`<b-radio-group value="1">
      <b-radio value="1" disabled size="small"> Radio 1 </b-radio>
    </b-radio-group>`);

    const radio = element.querySelector('b-radio') as BRadio;

    expect(radio.value).to.equal('1');
    expect(radio.checked).to.equal(true);
    expect(radio.disabled).to.equal(true);
    expect(radio.size).to.equal('small');

    const control = radio.shadowRoot?.querySelector('.radio__control');
    expect(control).to.have.class('radio__control--checked');
    expect(control).to.have.class('radio__control--disabled');

    expect(radio.textContent).to.equal(' Radio 1 ');
  });
});
