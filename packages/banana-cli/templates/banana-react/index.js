/* eslint-env node */

const toCamelCase = require('../toCamelCase');

const teamplete = (componentName) => `import { createComponent } from '@lit-labs/react';
import { B${toCamelCase(componentName)} } from 'banana-ui';
import * as React from 'react';

export const ${toCamelCase(componentName)} = createComponent({
  tagName: 'b-${componentName}',
  react: React,
  elementClass: B${toCamelCase(componentName)},
});`;

module.exports = teamplete;
