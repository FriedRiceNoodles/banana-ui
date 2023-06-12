import { CSSResultGroup, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './index.styles';

@customElement('b-dropdown')
export default class BDivider extends LitElement {
  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  static styles: CSSResultGroup = styles;

  render() {
    return html`
      <slot></slot>
      <slot name="drop"></slot>
    `;
  }
}
