/* eslint-env node */

const toCamelCase = require('../toCamelCase');

const template = (componentName) => {
  return `import { CSSResultGroup, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './index.styles';

@customElement('b-${componentName}')
export default class B${toCamelCase(componentName)} extends LitElement {
  static styles?: CSSResultGroup = styles;

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  render() {
    return html\` <div>New Component!</div> \`;
  }
}`;
};

module.exports = template;
