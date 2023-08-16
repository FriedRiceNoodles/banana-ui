import { expect, fixture, html } from '@open-wc/testing';
import BRating from '.';

describe('b-rating', () => {
  it('accessibility tests', async () => {
    const element = await fixture<BRating>(html`<b-rating></b-rating>`);
    await expect(element).to.be.accessible();
  });
});
