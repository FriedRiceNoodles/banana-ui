import { expect, fixture, html } from '@open-wc/testing';
import BSelect from '../select';

describe('b-select-option', () => {
  it('accessibility tests', async () => {
    const element = await fixture<BSelect>(html`
      <b-select>
        <b-select-option value="apple">Apple</b-select-option>
        <b-select-option value="banana">Banana</b-select-option>
        <b-select-option value="orange">Orange</b-select-option>
      </b-select>
    `);
    await expect(element).to.be.accessible();
  });
});
