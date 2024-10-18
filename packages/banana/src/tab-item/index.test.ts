import { expect, fixture, html } from '@open-wc/testing';
import BTab from '.';

describe('b-tab-item', () => {
  it('accessibility tests', async () => {
    const element = await fixture<BTab>(html`<b-tab-item></b-tab-item>`);
    await expect(element).to.be.accessible();
  });
});
