import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import BMenuItem from '.';
import BMenu from '../menu';

describe('b-menu-item', () => {
  it('accessibility tests', async () => {
    const element = await fixture<BMenu>(html`
      <b-menu>
        <b-menu-item>Option 1</b-menu-item>
        <b-menu-item>Option 2</b-menu-item>
        <b-menu-item>Option 3</b-menu-item>
        <b-divider></b-divider>
        <b-menu-item>Option A</b-menu-item>
        <b-menu-item>Option B</b-menu-item>
      </b-menu>
    `);
    await expect(element).to.be.accessible();
  });

  it('when provided no parameters', async () => {
    const element = await fixture<BMenuItem>(html` <b-menu-item>Banana</b-menu-item> `);
    expect(element.value).to.equal('');
    expect(element.disabled).to.equal(false);
    expect(element.getAttribute('aria-disabled')).to.equal('false');

    // emit the click event
    const spy = sinon.spy();
    element.addEventListener('click', spy);
    element.click();
    expect(spy.called).to.equal(true);
  });

  it('when provided a value', async () => {
    const element = await fixture<BMenuItem>(html` <b-menu-item value="banana">Banana</b-menu-item> `);
    expect(element.value).to.equal('banana');
  });

  it('should not emit the click event and set aria-disabled to true when disabled', async () => {
    const element = await fixture<BMenuItem>(html` <b-menu-item disabled>Banana</b-menu-item> `);
    const spy = sinon.spy();
    element.addEventListener('click', spy);
    element.click();
    expect(spy.called).to.equal(false);
    expect(element.disabled).to.equal(true);
    expect(element.getAttribute('aria-disabled')).to.equal('true');
  });
});
