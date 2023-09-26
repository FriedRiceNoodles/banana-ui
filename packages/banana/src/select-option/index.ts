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

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'option');
    this.setAttribute('aria-selected', this.selected.toString());
    this.setAttribute('aria-disabled', this.disabled.toString());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  @property({ reflect: true })
  value = '';

  willUpdate(changedProperties: PropertyValueMap<this>) {
    super.willUpdate(changedProperties);
    if (changedProperties.has('selected')) {
      this.setAttribute('aria-selected', this.selected.toString());
    }
    if (changedProperties.has('disabled')) {
      this.setAttribute('aria-disabled', this.disabled.toString());
    }
  }

  render() {
    return html`
      <div class="option" part="base">
        <slot></slot>
      </div>
    `;
  }
}
