import { CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import styles from './index.styles';

@customElement('b-popup')
export default class BPopup extends LitElement {
  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  static styles: CSSResultGroup = styles;

  // Which way does the popup window pop out from.
  @property({ reflect: true })
  position: 'top' | 'right' | 'bottom' | 'left' = 'bottom';

  @property({ reflect: true, type: Boolean })
  open = false;

  @property({ reflect: true, type: Boolean })
  round = false;

  @property({ reflect: true, type: Number })
  zIndex = 999;

  private _onClose() {
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
      <b-overlay ?open=${this.open} @close=${this._onClose} class="inside-overlay" zIndex=${this.zIndex}>
        <div
          class=${classMap({
            popup__container: true,
            'popup--round': this.round,
            'popup--open': this.open,
            'popup--top': this.position === 'top',
            'popup--right': this.position === 'right',
            'popup--bottom': this.position === 'bottom',
            'popup--left': this.position === 'left',
          })}
          part="container"
        >
          <slot></slot>
        </div>
      </b-overlay>
    `;
  }
}
