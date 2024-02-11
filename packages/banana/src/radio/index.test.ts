import { expect, fixture, html } from '@open-wc/testing';
import BRadio from '.';

describe('b-radio', () => {
  it('accessibility tests', async () => {
    const element = await fixture<BRadio>(html`<b-radio></b-radio>`);
    await expect(element).to.be.accessible();
  });
});
