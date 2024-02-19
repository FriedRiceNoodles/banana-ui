/* eslint-env node */

const toCamelCase = require('../toCamelCase');

const teamplete = (componentName) => `/**
* title: 基本使用
*/

import { ${toCamelCase(componentName)} } from '@banana-ui/react';
import React from 'react';

export default function BasicUsage() {
 return (
   <div>
     <${toCamelCase(componentName)}>
      New Component
     </${toCamelCase(componentName)}>
   </div>
 );
}
`;

module.exports = teamplete;
