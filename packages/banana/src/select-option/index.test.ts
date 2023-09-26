import { expect, fixture, html } from '@open-wc/testing';
import BSelectOption from '.';

describe('b-select-option', () => {
  it('accessibility tests', async () => {
    const element = await fixture<BSelectOption>(html`<b-select-option></b-select-option>`);
    await expect(element).to.be.accessible();
  });
});
