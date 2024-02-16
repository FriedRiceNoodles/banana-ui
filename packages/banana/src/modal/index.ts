/* eslint-disable lit-a11y/click-events-have-key-events */
import { CSSResultGroup, LitElement, PropertyValueMap, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../button';
import '../overlay';
import styles from './index.styles';

@customElement('b-modal')
export default class BModal extends LitElement {
  static styles?: CSSResultGroup = styles;

  @property({ type: Boolean, reflect: true })
  open = false;

  @property()
  title = '';

  @property({ reflect: true })
  width: number | string | undefined;

  @property({ attribute: 'ok-text' })
  okText = 'OK';

  @property({ attribute: 'cancel-text' })
  cancelText = 'Cancel';

  @property({ type: Boolean, reflect: true, attribute: 'ok-button-disabled' })
  okButtonDisabled = false;

  @property({ type: Boolean, reflect: true, attribute: 'cancel-button-disabled' })
  cancelButtonDisabled = false;

  @property({ type: Boolean, reflect: true, attribute: 'ok-button-loading' })
  okButtonLoading = false;

  @property({ type: Boolean, reflect: true, attribute: 'cancel-button-loading' })
  cancelButtonLoading = false;

  @property({ type: Boolean, reflect: true, attribute: 'ok-button-hidden' })
  okButtonHidden = false;

  @property({ type: Boolean, reflect: true, attribute: 'cancel-button-hidden' })
  cancelButtonHidden = false;

  @property({ type: Boolean, reflect: true, attribute: 'footer-hidden' })
  footerHidden = false;

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected willUpdate(_changedProperties: PropertyValueMap<this>): void {
    if (_changedProperties.has('width')) {
      const width = this.width !== undefined ? String(this.width) : '';
      const _regExp = /^\d+$/;
      this.style.setProperty('--banana-modal-width', _regExp.test(width) ? `${width}px` : width);
    }
  }

  private _handleCancel() {
    this.dispatchEvent(new CustomEvent('cancel'));
  }

  private _handleOk() {
    this.dispatchEvent(new CustomEvent('ok'));
  }

  render() {
    return html`
      <b-overlay ?open=${this.open} @close=${this._handleCancel}>
        <div part="base" class="modal">
          <div part="close" class="modal__close" @click=${this._handleCancel}>
            <svg
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1251"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path
                d="M822.003 776.822l0.023-0.022-575.522-575.483c-5.788-5.792-13.786-9.374-22.621-9.374-17.662 0-31.98 14.318-31.98 31.98 0 8.834 3.582 16.832 9.373 22.62L776.112 821.34c5.84 6.278 14.167 10.21 23.417 10.21 17.662 0 31.98-14.318 31.98-31.98 0-8.901-3.638-16.949-9.506-22.747z"
                p-id="1252"
              ></path>
              <path
                d="M776.784 201.448l-0.023-0.022-575.483 575.521c-5.792 5.788-9.374 13.786-9.374 22.621 0 17.663 14.318 31.98 31.98 31.98 8.834 0 16.832-3.582 22.62-9.373L821.301 247.34c6.278-5.839 10.21-14.166 10.21-23.416 0-17.662-14.318-31.98-31.98-31.98-8.902 0-16.95 3.637-22.747 9.505z"
                p-id="1253"
              ></path>
            </svg>
          </div>
          <div part="title" class="modal__title">
            <slot name="title">
              <div class="modal__title-default" ?hidden=${this.title.length === 0}>${this.title}</div>
            </slot>
          </div>
          <div part="content" class="modal__content">
            <slot></slot>
          </div>
          <div part="footer" class="modal__footer" ?hidden=${this.footerHidden}>
            <slot name="footer">
              <b-button
                @click=${this._handleCancel}
                ?disabled=${this.cancelButtonDisabled}
                ?loading=${this.cancelButtonLoading}
                ?hidden=${this.cancelButtonHidden}
                part="default-cancel-button"
              >
                ${this.cancelText}
              </b-button>
              <b-button
                type="primary"
                @click=${this._handleOk}
                ?disabled=${this.okButtonDisabled}
                ?loading=${this.okButtonLoading}
                ?hidden=${this.okButtonHidden}
                part="default-ok-button"
              >
                ${this.okText}
              </b-button>
            </slot>
          </div>
        </div>
      </b-overlay>
    `;
  }
}
