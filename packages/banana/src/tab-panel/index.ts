import { CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './index.styles';

@customElement('b-tab-panel')
export default class BTabPanel extends LitElement {
  static styles?: CSSResultGroup = styles;

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  @property({ type: String, reflect: true })
  name = '';

  @property({ type: Boolean, reflect: true })
  active = false;

  render() {
    return html`
      <div part="base" class="panel_container" aria-hidden=${!this.active}>
        <slot></slot>
      </div>
    `;
  }
}
