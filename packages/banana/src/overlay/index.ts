import { LitElement, html, PropertyValues, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './index.styles';

@customElement('b-overlay')
export default class BOverlay extends LitElement {
  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: Number })
  zIndex?: number = 999;

  static styles?: CSSResultGroup = styles;

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
    if (_changedProperties.get('open') === false) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('touchstart', this._preventTouchEvent);
      // window.addEventListener('keydown', this._escHandleMaskClose);
    } else {
      document.body.style.overflow = 'auto';
      document.removeEventListener('touchstart', this._preventTouchEvent);
      // window.removeEventListener('keydown', this._escHandleMaskClose);
    }
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  private _preventTouchEvent(e: TouchEvent) {
    e.preventDefault();
  }

  private async _handleMaskClose() {
    await this.updateComplete;
    this.dispatchEvent(new CustomEvent('onClose'));
  }

  // private _escHandleMaskClose(e: KeyboardEvent) {
  //   if(e.key !== 'Escape') return
  //   console.log(e.key === 'Escape');
  //   setTimeout(() => {
  //     this.dispatchEvent(new CustomEvent('onClose'));
  //   }, 300)
  // }

  /** 原生使用，直接拿Overlay对象调用方法 */
  public show() {
    this.open = true;
  }

  public hide() {
    this.open = false;
  }

  render() {
    return html` <div class="overlay__container" style="z-index: ${this.zIndex}">
        <slot></slot>
      </div>
      <div class="overlay__mask" @click="${this._handleMaskClose}" @keydown="${this._handleMaskClose}"></div>`;
  }
}
