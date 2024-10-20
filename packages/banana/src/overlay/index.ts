/* eslint-disable lit-a11y/click-events-have-key-events */
import { CSSResultGroup, LitElement, PropertyValueMap, PropertyValues, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './index.styles';

@customElement('b-overlay')
export default class BOverlay extends LitElement {
  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: Number })
  zIndex = 999;

  // If no-close-when-mask-clicked is true, the overlay will not dispatch a close event when the mask is clicked.
  @property({ type: Boolean, attribute: 'no-close-when-mask-clicked' })
  noCloseWhenMaskClicked = false;

  // If no-close-when-esc-key-pressed is true, the overlay will not dispatch a close event when the esc key is pressed.
  @property({ type: Boolean, attribute: 'no-close-when-esc-key-pressed' })
  noCloseWhenEscKeyPressed = false;

  static styles: CSSResultGroup = styles;

  // A style element to set the overflow of body to hidden.
  private _styleElement = document.createElement('style');

  protected willUpdate(_changedProperties: PropertyValueMap<this>): void {
    if (_changedProperties.has('zIndex')) {
      this.style.zIndex = String(this.zIndex);
    }
  }

  protected updated(_changedProperties: PropertyValues<this>): void {
    // _changedProperties is the previous values, so we use this.open to get the current value.
    if (_changedProperties.has('open') && this.open) {
      document.head.appendChild(this._styleElement);
      document.addEventListener('touchstart', this._preventTouchEvent);
      window.addEventListener('keydown', this._handleEscape);
    } else {
      this.removeEvents();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.style.zIndex = String(this.zIndex);
    this._styleElement.innerHTML = 'body { overflow: hidden; }';
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEvents();
  }

  private removeEvents() {
    this._styleElement.remove();
    document.removeEventListener('touchstart', this._preventTouchEvent);
    window.removeEventListener('keydown', this._handleEscape);
  }

  private _preventTouchEvent(e: TouchEvent) {
    e.preventDefault();
  }

  // Use arrow function to bind 'this' on BOverlay class.
  private _handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && !this.noCloseWhenEscKeyPressed) {
      this._handleMaskClose();
    }
  };

  private _handleMaskClick() {
    if (!this.noCloseWhenMaskClicked) {
      this._handleMaskClose();
    }
  }

  private _handleMaskClose() {
    this.dispatchEvent(new CustomEvent('close'));
  }

  public show() {
    this.open = true;
  }

  public hide() {
    this.open = false;
  }

  render() {
    return html`
      <div class="overlay__container" part="container">
        <slot></slot>
      </div>
      <div class="overlay__mask" @click="${this._handleMaskClick}"></div>
    `;
  }
}
