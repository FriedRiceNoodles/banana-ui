import { expect, fixture, html } from '@open-wc/testing';
import BTooltip from '.';

describe('b-tooltip', () => {
  it('accessibility tests', async () => {
    const element = await fixture<BTooltip>(html`<b-tooltip></b-tooltip>`);
    await expect(element).to.be.accessible();
  });
});
