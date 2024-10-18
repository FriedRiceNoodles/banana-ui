import { expect, fixture, html } from '@open-wc/testing';
import BTabs from '.';

describe('b-tabs', () => {
  it('accessibility tests', async () => {
    const element = await fixture<BTabs>(html`<b-tabs></b-tabs>`);
    await expect(element).to.be.accessible();
  });
});
