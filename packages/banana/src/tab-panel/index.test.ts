import { expect, fixture, html } from '@open-wc/testing';
import BTabPanel from '.';

describe('b-tab-panel', () => {
  it('accessibility tests', async () => {
    const element = await fixture<BTabPanel>(html`<b-tab-panel></b-tab-panel>`);
    await expect(element).to.be.accessible();
  });
});
