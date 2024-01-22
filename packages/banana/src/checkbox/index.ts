import { CSSResultGroup, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BananaFormElementWithOverriddenProperties, FormController } from 'packages/banana/controllers/form';
import styles from './index.styles';

const overriddenProperties = [
  ['value', 'checked'],
  ['defaultValue', 'defaultChecked'],
] as const;

@customElement('b-checkbox')
export default class BCheckbox
  extends LitElement
  implements BananaFormElementWithOverriddenProperties<typeof overriddenProperties>
{
  private readonly formController = new FormController<typeof overriddenProperties>(this, overriddenProperties);

  static styles?: CSSResultGroup = styles;

  @query('input')
  private _validationInput!: HTMLInputElement;

  @property()
  name = '';

  @property({ reflect: true, type: Boolean })
  checked = false;

  @property({ reflect: true, attribute: 'default-checked', type: Boolean })
  defaultChecked = false;

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

  @property({ reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  // Pass the reportValidity() method to the form controller.
  reportValidity() {
    return this._validationInput.reportValidity();
  }

  checkValidity() {
    return this._validationInput.checkValidity();
  }

  private _handleChange() {
    if (this.disabled || this.readonly) return;
    const checked = !this.checked;
    if (!this.controlled) {
      this.checked = checked;
    }

    const eventOptions = { bubbles: false, cancelable: false, composed: true, detail: { checked } };
    this.dispatchEvent(new CustomEvent('change', eventOptions));
  }

  private _handleClick() {
    this._handleChange();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected firstUpdated(_changedProperties: PropertyValueMap<this>): void {
    if (!this.checked) {
      this.checked = this.defaultChecked;
    }
  }

  render() {
    return html`
      <div
        class=${classMap({
          checkbox: true,
          'checkbox--checked': this.checked,
          'checkbox--disabled': this.disabled,
          'checkbox--readonly': this.readonly,
          'checkbox--indeterminate': this.indeterminate,
          [`checkbox--${this.size}`]: true,
        })}
        part="base"
        @click=${this._handleClick}
        @keydown=${() => {
          // todo: implement this
        }}
      >
        <input class="checkbox__validation-input" value=${this.checked ? '1' : ''} ?required=${this.required} />
        <span
          class=${classMap({
            checkbox__control: true,
            'checkbox__control--checked': this.checked,
            'checkbox__control--disabled': this.disabled,
            'checkbox__control--readonly': this.readonly,
            'checkbox__control--indeterminate': this.indeterminate,
          })}
        ></span>
        <div class="checkbox__label">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
