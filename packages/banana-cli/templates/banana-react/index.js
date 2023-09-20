/* eslint-env node */

const toCamelCase = require('../toCamelCase');

const teamplete = (componentName, formField) => `import { createComponent } from '@lit-labs/react';
import { B${toCamelCase(componentName)} } from 'banana-ui';
import * as React from 'react';

export const ${toCamelCase(componentName)} = createComponent({
  tagName: 'b-${componentName}',
  react: React,
  elementClass: B${toCamelCase(componentName)},
  ${
    formField
      ? `events: {
    onChange: 'change',
  },`
      : ''
  }
});`;

module.exports = teamplete;
