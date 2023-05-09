import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './index.styles';
import { CSSResultGroup } from 'lit/development';

@customElement('b-overlay')
export default class BOverlay extends LitElement {
  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: Number })
  zIndex?: number | string = 999;

  static styles?: CSSResultGroup = styles;

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
    if (_changedProperties.get('open') === false) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('touchstart', this._cancelTouchEvent);
    } else {
      document.body.style.overflow = 'auto';
      document.removeEventListener('touchstart', this._cancelTouchEvent);
    }
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  private _cancelTouchEvent(e: TouchEvent) {
    e.preventDefault();
  }

  private _handleMaskClose() {
    this.dispatchEvent(new CustomEvent('handleMaskClose'));
  }

  render() {
    return html` <div class="banana-overlay" style="z-index: ${this.zIndex}">
        <slot></slot>
      </div>
      <div class="banana-overlay-mask" @click="${this._handleMaskClose}" @keydown="${this._handleMaskClose}"></div>`;
  }
}
