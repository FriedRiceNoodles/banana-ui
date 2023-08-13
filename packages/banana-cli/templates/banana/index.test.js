/* eslint-env node */

const toCamelCase = require('../toCamelCase');

const template = (componentName) => `import { expect, fixture, html } from '@open-wc/testing';
import B${toCamelCase(componentName)} from '.';

describe('b-${componentName}', () => {
  it('accessibility tests', async () => {
    const element = await fixture<B${toCamelCase(componentName)}>(html\`<b-${componentName}></b-${componentName}>\`);
    await expect(element).to.be.accessible();
  });
});
`;

module.exports = template;
