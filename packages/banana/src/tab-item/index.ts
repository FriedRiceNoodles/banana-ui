import { CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import styles from './index.styles';

@customElement('b-tab-item')
export default class BTabItem extends LitElement {
  static styles?: CSSResultGroup = styles;

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  @property({ type: Boolean, reflect: true })
  active = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, reflect: true })
  panel = '';

  render() {
    return html`
      <div
        part="base"
        class=${classMap({ 'tab-item': true, 'tab-item--active': this.active, 'tab-item--disabled': this.disabled })}
        aria-selected=${this.active}
        aria-disabled=${this.disabled}
      >
        <slot></slot>
      </div>
    `;
  }
}
