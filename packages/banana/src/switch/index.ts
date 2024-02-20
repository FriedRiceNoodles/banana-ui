import { CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property, query, queryAssignedElements, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BananaFormElementWithOverriddenProperties, FormController } from 'packages/banana/controllers/form';
import styles from './index.styles';

const overriddenProperties = [
  ['value', 'checked'],
  ['defaultValue', 'defaultChecked'],
] as const;

@customElement('b-switch')
export default class BSwitch
  extends LitElement
  implements BananaFormElementWithOverriddenProperties<typeof overriddenProperties>
{
  private readonly formController = new FormController<typeof overriddenProperties>(this, overriddenProperties);

  static styles?: CSSResultGroup = styles;

  @query('input')
  private _validationInput!: HTMLInputElement;

  @queryAssignedElements({ slot: 'checked' })
  _checkedSlotEl!: Array<HTMLElement>;

  @queryAssignedElements({ slot: 'unchecked' })
  _uncheckedSlotEl!: Array<HTMLElement>;

  @property()
  name = '';

  @property({ reflect: true })
  size: 'small' | 'default' = 'default';

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

  @state()
  private _innerWidth?: number;

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

  protected firstUpdated(): void {
    if (!this.checked) {
      this.checked = this.defaultChecked;
    }

    this._innerWidth =
      this._checkedSlotEl[0]?.offsetWidth > this._uncheckedSlotEl[0]?.offsetWidth
        ? this._checkedSlotEl[0]?.offsetWidth
        : this._uncheckedSlotEl[0]?.offsetWidth;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  render() {
    // eslint-disable-next-line lit-a11y/click-events-have-key-events
    return html`<div
      part="base"
      class=${classMap({
        'banana-switch': true,
        'banana-switch-sm': this.size === 'small',
      })}
      @click=${this._handleChange}
      aria-label="Name"
    >
      <input
        part="input"
        aria-label="checkbox"
        ?checked=${this.checked}
        type="checkbox"
        class="switch__input"
        role="switch"
        aria-checked=${this.checked}
      />
      <div
        part="control"
        class=${classMap({
          switch__control: true,
          'switch__control-sm': this.size === 'small',
        })}
      ></div>

      <div part="inner" class="switch__inner" style="--banana-inner-width:${this._innerWidth}px">
        <div class="switch__inner-wrapper switch__checked-offset">
          <slot name="checked"></slot>
        </div>
        <div class="switch__inner-wrapper switch__unchecked-offset">
          <slot name="unchecked"></slot>
        </div>
      </div>
    </div>`;
  }
}
