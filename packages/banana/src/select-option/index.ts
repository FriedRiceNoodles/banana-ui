import { CSSResultGroup, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './index.styles';

@customElement('b-select-option')
export default class BSelectOption extends LitElement {
  static styles?: CSSResultGroup = styles;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: Boolean, reflect: true })
  active = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'option');
    this.setAttribute('aria-selected', this.selected.toString());
    this.setAttribute('aria-disabled', this.disabled.toString());
    this.setAttribute('title', this.innerText);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  @property({ reflect: true })
  value = '';

  willUpdate(changedProperties: PropertyValueMap<this>) {
    if (changedProperties.has('selected')) {
      this.setAttribute('aria-selected', this.selected.toString());
    }
    if (changedProperties.has('disabled')) {
      this.setAttribute('aria-disabled', this.disabled.toString());
    }
  }

  private _handleSlotChange() {
    // Set title attribute to the host element
    this.setAttribute('title', this.innerText);
  }

  render() {
    return html`
      <div class="option" part="base">
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
    `;
  }
}
