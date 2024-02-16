import { CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import styles from './index.styles';

@customElement('b-radio')
export default class BRadio extends LitElement {
  static styles?: CSSResultGroup = styles;

  @property({ reflect: true })
  value = '';

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  render() {
    return html`
      <div
        class=${classMap({
          radio: true,
          'radio--checked': this.checked,
          'radio--disabled': this.disabled,
          [`radio--${this.size}`]: true,
        })}
        part="base"
      >
        <span
          class=${classMap({
            radio__control: true,
            'radio__control--checked': this.checked,
            'radio__control--disabled': this.disabled,
          })}
          part="control"
        ></span>
        <div class="radio__label" part="label">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
