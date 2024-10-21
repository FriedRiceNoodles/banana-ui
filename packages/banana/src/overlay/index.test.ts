import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import BOverlay from '.';

describe('b-overlay', () => {
  it('when provided no parameters', async () => {
    const element = await fixture<BOverlay>(html` <b-overlay></b-overlay> `);
    expect(element.open).to.equal(false);
    expect(element.hasAttribute('open')).to.equal(false);
    expect(element.zIndex).to.equal(999);
    expect(getComputedStyle(element).zIndex).to.equal('999');
    expect(getComputedStyle(element).visibility).to.equal('hidden');
    expect(getComputedStyle(element).opacity).to.equal('0');
  });

  it('when provided open', async () => {
    const element = await fixture<BOverlay>(html` <b-overlay open></b-overlay> `);
    expect(element.open).to.equal(true);
    expect(element.hasAttribute('open')).to.equal(true);
    expect(getComputedStyle(element).visibility).to.equal('visible');
    expect(getComputedStyle(element).opacity).to.equal('1');
  });

  it('when provided zIndex', async () => {
    const element = await fixture<BOverlay>(html` <b-overlay zIndex="100"></b-overlay> `);
    expect(element.zIndex).to.equal(100);
    expect(getComputedStyle(element).zIndex).to.equal('100');
  });

  it('should emit the close event when click on mask', async () => {
    const element = await fixture<BOverlay>(html` <b-overlay open></b-overlay> `);
    const spy = sinon.spy();
    element.addEventListener('close', spy);
    element.shadowRoot?.querySelector('.overlay__mask')?.dispatchEvent(new Event('click'));
    expect(spy.called).to.equal(true);
  });

  it('should emit the close event when press escape', async () => {
    const element = await fixture<BOverlay>(html` <b-overlay open></b-overlay> `);
    const spy = sinon.spy();
    element.addEventListener('close', spy);
    await sendKeys({ down: 'Escape' });
    expect(spy.calledOnce).to.equal(true);
  });

  it('should not emit the close event when press other key', async () => {
    const element = await fixture<BOverlay>(html` <b-overlay open></b-overlay> `);
    const spy = sinon.spy();
    element.addEventListener('close', spy);
    await sendKeys({ down: 'Enter' });
    expect(spy.called).to.equal(false);
  });

  it('should not emit the close event when press escape and overlay is closed', async () => {
    const element = await fixture<BOverlay>(html` <b-overlay></b-overlay> `);
    const spy = sinon.spy();
    element.addEventListener('close', spy);
    await sendKeys({ down: 'Escape' });
    expect(spy.called).to.equal(false);
  });

  it('should open the overlay when call show method', async () => {
    const element = await fixture<BOverlay>(html` <b-overlay></b-overlay> `);
    element.show();
    await element.updateComplete;
    expect(element.open).to.equal(true);
    expect(element.hasAttribute('open')).to.equal(true);
    expect(getComputedStyle(element).visibility).to.equal('visible');
    expect(getComputedStyle(element).opacity).to.equal('1');
  });

  it('should close the overlay when call hide method', async () => {
    const element = await fixture<BOverlay>(html` <b-overlay open></b-overlay> `);
    element.hide();
    await element.updateComplete;
    expect(element.open).to.equal(false);
    expect(element.hasAttribute('open')).to.equal(false);
    expect(getComputedStyle(element).visibility).to.equal('hidden');
    expect(getComputedStyle(element).opacity).to.equal('0');
  });

  it('should prevent click and scroll through the mask when overlay is open', async () => {
    const element = await fixture<BOverlay>(html` <b-overlay open></b-overlay> `);
    expect(getComputedStyle(document.body).overflow).to.equal('hidden');

    const spy = sinon.spy();
    document.body.addEventListener('click', spy);
    element.shadowRoot?.querySelector('.overlay__mask')?.dispatchEvent(new Event('click'));
    expect(spy.called).to.equal(false);
  });

  it('when provided children', async () => {
    const element = await fixture<BOverlay>(html` <b-overlay open><div>banana</div></b-overlay> `);
    expect(element.shadowRoot?.querySelector('slot')?.assignedNodes()[0]?.textContent).to.equal('banana');

    const content2 = '<div>apple</div>';
    element.innerHTML = content2;
    await element.updateComplete;
    expect(element.shadowRoot?.querySelector('slot')?.assignedNodes()[0]?.textContent).to.equal('apple');

    // click on children should not emit close event.
    const spy = sinon.spy();
    element.addEventListener('close', spy);
    element.shadowRoot?.querySelector('div')?.dispatchEvent(new Event('click'));
    expect(spy.called).to.equal(false);
  });

  it('should not emit the close event when click on mask and noCloseWhenMaskClicked is true', async () => {
    const element = await fixture<BOverlay>(html` <b-overlay open no-close-when-mask-clicked></b-overlay> `);
    const spy = sinon.spy();
    element.addEventListener('close', spy);
    element.shadowRoot?.querySelector('.overlay__mask')?.dispatchEvent(new Event('click'));
    expect(spy.called).to.equal(false);
  });

  it('should not emit the close event when press escape and noCloseWhenEscKeyPressed is true', async () => {
    const element = await fixture<BOverlay>(html` <b-overlay open no-close-when-esc-key-pressed></b-overlay> `);
    const spy = sinon.spy();
    element.addEventListener('close', spy);
    await sendKeys({ down: 'Escape' });
    expect(spy.called).to.equal(false);
  });
});
