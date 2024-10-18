import { CSSResultGroup, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, query, queryAssignedElements } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BananaFormElement, FormController } from 'packages/banana/controllers/form';
import type BRadio from '../radio';
import styles from './index.styles';

@customElement('b-radio-group')
export default class BRadioGroup extends LitElement implements BananaFormElement {
  private readonly formController = new FormController(this);

  static styles?: CSSResultGroup = styles;

  @query('input')
  private _validationInput!: HTMLInputElement;

  @queryAssignedElements({ selector: 'b-radio' })
  _radios!: Array<BRadio>;

  @property()
  name = '';

  @property({ reflect: true })
  value = '';

  @property({ reflect: true, attribute: 'default-value' })
  defaultValue = '';

  @property()
  form: string | undefined;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: Boolean, reflect: true })
  controlled = false;

  @property({ type: Boolean, reflect: true })
  vertical = false;

  // Pass the reportValidity() method to the form controller.
  reportValidity() {
    return this._validationInput.reportValidity();
  }

  checkValidity() {
    return this._validationInput.checkValidity();
  }

  private _handleChange(value: string) {
    const eventOptions = { bubbles: false, cancelable: false, composed: true, detail: { value } };
    this.dispatchEvent(new CustomEvent('change', eventOptions));
    if (this.controlled) return;
    this.value = value;
  }

  private _handleClick(event: MouseEvent) {
    if (this.disabled || this.readonly) return;
    const target = event.target as HTMLElement;
    const radio = target.closest('b-radio') as BRadio;
    if (!radio || radio.disabled) return;

    const value = radio.value;
    this._handleChange(value);
  }

  // todo...
  private _handleKeydown(event: KeyboardEvent) {
    return event;
  }

  private _updateRadioCheckedState() {
    for (const radio of this._radios) {
      // Empty value is not allowed.
      if (this.value === radio.value && this.value !== '') {
        radio.checked = true;
      } else {
        radio.checked = false;
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected firstUpdated(): void {
    if (this.defaultValue !== '' && this.value === '') {
      this.value = this.defaultValue;
    }

    this._updateRadioCheckedState();
  }

  protected willUpdate(_changedProperties: PropertyValueMap<this>): void {
    if (_changedProperties.has('value')) {
      this._updateRadioCheckedState();
    }
  }

  render() {
    return html`
      <div
        class=${classMap({
          'radio-group': true,
          'radio-group--disabled': this.disabled,
          'radio-group--readonly': this.readonly,
          'radio-group--vertical': this.vertical,
        })}
        @click=${this._handleClick}
        @keydown=${this._handleKeydown}
        part="base"
      >
        <input class="radio-group__validation-input" value=${this.value} ?required=${this.required} />
        <slot></slot>
      </div>
    `;
  }
}
