/* eslint-env node */

const toCamelCase = require('../toCamelCase');

const teamplete = (componentName, formField) => `import { createComponent } from '@lit-labs/react';
import { B${toCamelCase(componentName)} } from '@banana-ui/banana';
import * as React from 'react';

const events = ${formField ? "{onChange: 'change'}" : '{}'}

export const ${toCamelCase(componentName)} = createComponent({
  tagName: 'b-${componentName}',
  react: React,
  elementClass: B${toCamelCase(componentName)},
  events
});`;

module.exports = teamplete;
