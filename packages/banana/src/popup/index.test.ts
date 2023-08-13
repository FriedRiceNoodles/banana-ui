import { fixture, html, expect } from '@open-wc/testing';
import BPopup from '.';
import BOverlay from '../overlay';
import sinon from 'sinon';
import { sendKeys, sendMouse } from '@web/test-runner-commands';

describe('b-popup', () => {
  it('when provided no parameters', async () => {
    const element = await fixture<BPopup>(html` <b-popup></b-popup> `);
    expect(element.open).to.equal(false);
    expect(element.position).to.equal('bottom');
    expect(element.round).to.equal(false);
    expect(element.zIndex).to.equal(999);

    const overlay = element.shadowRoot?.querySelector('b-overlay') as BOverlay;
    expect(overlay?.open).to.equal(false);
  });

  it('when provided open', async () => {
    const element = await fixture<BPopup>(html` <b-popup open></b-popup> `);
    expect(element.open).to.equal(true);

    const overlay = element.shadowRoot?.querySelector('b-overlay') as BOverlay;
    expect(overlay?.open).to.equal(true);
  });

  it('when provided position', async () => {
    const element = await fixture<BPopup>(html` <b-popup position="top"></b-popup> `);
    expect(element.position).to.equal('top');

    element.position = 'right';
    await element.updateComplete;
    expect(element.position).to.equal('right');

    element.position = 'bottom';
    await element.updateComplete;
    expect(element.position).to.equal('bottom');

    element.position = 'left';
    await element.updateComplete;
    expect(element.position).to.equal('left');
  });

  it('when provided round', async () => {
    const element = await fixture<BPopup>(html` <b-popup round></b-popup> `);
    expect(element.round).to.equal(true);
  });

  it('when provided zIndex', async () => {
    const element = await fixture<BPopup>(html` <b-popup zIndex="100"></b-popup> `);
    expect(element.zIndex).to.equal(100);

    const overlay = element.shadowRoot?.querySelector('b-overlay') as BOverlay;
    expect(overlay?.zIndex).to.equal(100);
  });

  it('should emit the close event when click on mask', async () => {
    const element = await fixture<BPopup>(html` <b-popup open></b-popup> `);
    const spy = sinon.spy();
    element.addEventListener('close', spy);
    await sendMouse({ type: 'click', position: [300, 300] });
    expect(spy.calledOnce).to.equal(true);
  });

  it('should emit the close event when press escape', async () => {
    const element = await fixture<BPopup>(html` <b-popup open></b-popup> `);
    const spy = sinon.spy();
    element.addEventListener('close', spy);
    await sendKeys({ down: 'Escape' });
    expect(spy.calledOnce).to.equal(true);
  });

  it('should open popup when call show method', async () => {
    const element = await fixture<BPopup>(html` <b-popup></b-popup> `);
    element.show();
    await element.updateComplete;
    expect(element.open).to.equal(true);
  });

  it('should close popup when call hide method', async () => {
    const element = await fixture<BPopup>(html` <b-popup open></b-popup> `);
    element.hide();
    await element.updateComplete;
    expect(element.open).to.equal(false);
  });

  it('when provided children', async () => {
    const element = await fixture<BPopup>(html` <b-popup open><div id="test">test</div></b-popup> `);
    const test = element.querySelector('#test');
    expect(test?.textContent).to.equal('test');

    const content2 = '<div id="test2">test2</div>';
    element.innerHTML = content2;
    await element.updateComplete;
    const test2 = element.querySelector('#test2');
    expect(test2?.textContent).to.equal('test2');

    // click on children should not emit close event.
    const spy = sinon.spy();
    element.addEventListener('close', spy);
    element.querySelector('#test2')?.dispatchEvent(new Event('click'));
    expect(spy.called).to.equal(false);
  });
});
