import { aTimeout, expect, fixture, html, waitUntil } from '@open-wc/testing';
import * as sinon from 'sinon';
import BCollapse from '.';

describe('b-collapse', () => {
  it('accessibility tests', async () => {
    const element = await fixture<BCollapse>(html`<b-collapse title="title"> Banana </b-collapse>`);
    await expect(element).to.be.accessible();
  });

  it('content should be visible with the open attribute', async () => {
    const element = await fixture<BCollapse>(html`<b-collapse open title="title"> Banana </b-collapse>`);
    const body = element.shadowRoot!.querySelector('.collapse__body')!;

    expect(body.clientHeight).not.to.equal(0);
  });

  it('content should not be visible without the open attribute', async () => {
    const element = await fixture<BCollapse>(html`<b-collapse title="title"> Banana </b-collapse>`);
    const body = element.shadowRoot!.querySelector('.collapse__body')!;

    expect(body.clientHeight).to.equal(0);
  });

  it('should dispatch show event and afterShow event when calling show() method', async () => {
    const element = await fixture<BCollapse>(html`<b-collapse title="title"> Banana </b-collapse>`);
    const body = element.shadowRoot!.querySelector('.collapse__body')!;

    const showHandler = sinon.spy();
    const afterShowHandler = sinon.spy();

    element.addEventListener('show', showHandler);
    element.addEventListener('afterShow', afterShowHandler);

    element.show();

    await waitUntil(() => showHandler.called);
    await waitUntil(() => afterShowHandler.called);

    expect(showHandler).to.have.been.called;
    expect(afterShowHandler).to.have.been.called;
    expect(body.clientHeight).not.to.equal(0);
  });

  it('should dispatch hide event and afterHide event when calling hide() method', async () => {
    const element = await fixture<BCollapse>(html`<b-collapse open title="title"> Banana </b-collapse>`);
    const body = element.shadowRoot!.querySelector('.collapse__body')!;

    const hideHandler = sinon.spy();
    const afterHideHandler = sinon.spy();

    element.addEventListener('hide', hideHandler);
    element.addEventListener('afterHide', afterHideHandler);

    element.hide();

    await waitUntil(() => hideHandler.called);
    await waitUntil(() => afterHideHandler.called);

    expect(hideHandler).to.have.been.called;
    expect(afterHideHandler).to.have.been.called;
    expect(body.clientHeight).to.equal(0);
  });

  it('should not open when disabled', async () => {
    const element = await fixture<BCollapse>(html`<b-collapse disabled title="title"> Banana </b-collapse>`);
    const body = element.shadowRoot!.querySelector('.collapse__body')!;

    const showHandler = sinon.spy();
    const afterShowHandler = sinon.spy();

    element.addEventListener('show', showHandler);
    element.addEventListener('afterShow', afterShowHandler);

    element.show();

    await aTimeout(1000);

    expect(showHandler).not.to.have.been.called;
    expect(afterShowHandler).not.to.have.been.called;
    expect(body.clientHeight).to.equal(0);
  });
});
