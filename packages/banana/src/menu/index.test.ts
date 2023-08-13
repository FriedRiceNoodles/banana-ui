import { fixture, html, expect } from '@open-wc/testing';
import BMenu from '.';
import sinon from 'sinon';

describe('b-menu', () => {
  it('should emit the select event with the correct event detail when an item is clicked', async () => {
    const element = await fixture<BMenu>(html`
      <b-menu>
        <b-menu-item value="1">Option 1</b-menu-item>
        <b-menu-item value="2">Option 2</b-menu-item>
        <b-menu-item value="3">Option 3</b-menu-item>
        <b-divider></b-divider>
        <b-menu-item value="A">Option A</b-menu-item>
        <b-menu-item value="B">Option B</b-menu-item>
      </b-menu>
    `);

    const item = element.querySelector('b-menu-item[value="1"]') as HTMLElement;

    const spy = sinon.spy();
    element.addEventListener('select', spy);

    item.click();
    expect(spy.calledOnce).to.equal(true);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(spy.firstCall.args[0].detail.item).to.equal(item);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(spy.firstCall.args[0].detail.item.value).to.equal('1');
  });

  it('should not emit the select event when a disabled item is clicked', async () => {
    const element = await fixture<BMenu>(html`
      <b-menu>
        <b-menu-item value="1">Option 1</b-menu-item>
        <b-menu-item value="2" disabled>Option 2</b-menu-item>
        <b-menu-item value="3">Option 3</b-menu-item>
        <b-divider></b-divider>
        <b-menu-item value="A">Option A</b-menu-item>
        <b-menu-item value="B">Option B</b-menu-item>
      </b-menu>
    `);

    const item = element.querySelector('b-menu-item[value="2"]') as HTMLElement;

    const spy = sinon.spy();
    element.addEventListener('select', spy);

    item.click();
    expect(spy.called).to.equal(false);
  });

  it('should not emit the select event when a non-item is clicked', async () => {
    const element = await fixture<BMenu>(html`
      <b-menu>
        <b-menu-item value="1">Option 1</b-menu-item>
        <b-menu-item value="2" disabled>Option 2</b-menu-item>
        <b-menu-item value="3">Option 3</b-menu-item>
        <b-divider></b-divider>
        <b-menu-item value="A">Option A</b-menu-item>
        <b-menu-item value="B">Option B</b-menu-item>
      </b-menu>
    `);

    const spy = sinon.spy();
    element.addEventListener('select', spy);

    element.click();
    expect(spy.called).to.equal(false);
  });
});
