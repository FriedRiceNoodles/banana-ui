import { CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import styles from './index.styles';

@customElement('b-button')
export default class BButton extends LitElement {
  @property({ reflect: true }) type: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'dashed' = 'default';

  @property({ reflect: true }) size: 'small' | 'default' | 'large' = 'default';

  @property({ type: Boolean, reflect: true }) disabled = false;

  @property({ type: Boolean, reflect: true }) pill = false;

  @property({ type: Boolean, reflect: true }) outline = false;

  static styles?: CSSResultGroup = styles;

  render() {
    return html`
      <button
        class=${classMap({
          button: true,
          'button--default': this.type === 'default',
          'button--primary': this.type === 'primary',
          'button--success': this.type === 'success',
          'button--warning': this.type === 'warning',
          'button--dashed': this.type === 'dashed',
          'button--danger': this.type === 'danger',
          'button--small': this.size === 'small',
          'button--medium': this.size === 'default',
          'button--large': this.size === 'large',
          'button--pill': this.pill === true,
          'button--outline': this.outline === true,
        })}
      >
        <slot part="content" class="button__content"></slot>
      </button>
    `;
  }
}
