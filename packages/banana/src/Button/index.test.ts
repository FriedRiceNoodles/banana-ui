import { expect, fixture, html } from '@open-wc/testing';
import type BButton from '.';

const types: BButton['type'][] = ['default', 'primary', 'success', 'warning', 'danger', 'dashed'];

describe('b-button', () => {
  describe('accessibility tests', () => {
    types.forEach((type) => {
      // Orange is too difficult to meet the high contrast rule...
      const ignoredRules = type === 'warning' ? ['color-contrast'] : [];

      it(`should be accessible when type is "${type}"`, async () => {
        const element = await fixture<BButton>(html` <b-button type=${type}> Banana </b-button> `);
        await expect(element).to.be.accessible({ ignoredRules });
      });
    });
  });
});
