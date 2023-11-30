import { CSSResultGroup, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';
import { BananaFormElement, FormController } from 'packages/banana/controllers/form';
import styles from './index.styles';
import { MathUtils } from './utils';

@customElement('b-stepper')
export default class BStepper extends LitElement implements BananaFormElement {
  private readonly formController = new FormController(this);

  static styles?: CSSResultGroup = styles;

  @property()
  name = '';

  @property({ type: Number, reflect: true })
  value = 0;

  @property({ type: Number, reflect: true, attribute: 'default-value' })
  defaultValue = 0;

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

  @property({ type: Number }) min?: number;

  @property({ type: Number }) max?: number;

  @property({ type: Number }) step = 1;

  @property({ type: Boolean }) integer = false;

  @query('.stepper__input') private input!: HTMLInputElement;

  @state() minusDisabled = false;

  @state() plusDisabled = false;

  @state() preInputVal = this.value;

  @state() _focusing = false;

  // Pass the reportValidity() method to the form controller.
  reportValidity() {
    return this.required ? isNaN(Number(this.value)) : true;
  }

  checkValidity() {
    return this.required ? isNaN(Number(this.value)) : true;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected firstUpdated(): void {
    this.checkFallbackValue(this.input.value);
  }

  protected willUpdate(changedProperties: PropertyValueMap<this>): void {
    if (changedProperties.has('value')) {
      if (changedProperties.get('value')) {
        this.preInputVal = this.value;
      }

      if (this.min) {
        this.minusDisabled = this.value <= this.min ? true : false;
      }

      if (this.max) {
        this.plusDisabled = this.value >= this.max ? true : false;
      }
    }
  }

  private _handleFocus(event: FocusEvent) {
    event.stopPropagation();
    this._focusing = true;
    this.dispatchEvent(new CustomEvent('focus'));
  }

  private _handleBlur(event: FocusEvent) {
    event.stopPropagation();
    this._focusing = false;
    this.dispatchEvent(new CustomEvent('blur'));
  }

  minus() {
    if (this.disabled || this.minusDisabled) return;
    const result = MathUtils.minus(this.value, this.step);
    if (!this.min || (this.min && this.value > this.min && result >= this.min)) {
      this.value = result;
    } else {
      this.value = this.min;
    }

    const eventOptions = { bubbles: false, cancelable: false, composed: true, detail: { value: this.value } };
    this.dispatchEvent(new CustomEvent('change', eventOptions));
  }

  plus() {
    if (this.disabled || this.plusDisabled) return;
    const result = MathUtils.add(this.value, this.step);
    if (!this.max || (this.max && this.value < this.max && result <= this.max)) {
      this.value = result;
    } else {
      this.value = this.max;
    }

    const eventOptions = { bubbles: false, cancelable: false, composed: true, detail: { value: this.value } };
    this.dispatchEvent(new CustomEvent('change', eventOptions));
  }

  private _inputChange(event: InputEventInit) {
    const currentInputValue = event.data;
    const value = this.input.value;

    if (!this.controlled) {
      this.updateInputContent(value, currentInputValue);
    }
  }

  private _inputBlur() {
    const inputElValue = this.input.value;

    if (!inputElValue || isNaN(Number(inputElValue))) {
      this.value = this.min ? this.min : 0;

      const eventOptions = { bubbles: false, cancelable: false, composed: true, detail: { value: this.value } };
      this.dispatchEvent(new CustomEvent('change', eventOptions));
      this.requestUpdate();
      return;
    }

    this.checkFallbackValue(inputElValue);
    this.requestUpdate();
    const eventOptions = { bubbles: false, cancelable: false, composed: true, detail: { value: this.value } };
    this.dispatchEvent(new CustomEvent('change', eventOptions));
  }

  private updateInputContent(inputElVal: string, currentInputValue?: string | null) {
    const matchFormatRegex = /^(-|\+)?\d+(\.\d+)?$/g;

    const isInputValid = this.integer
      ? !inputElVal || inputElVal === '-'
      : !inputElVal ||
        inputElVal === '-' ||
        ((currentInputValue === '.' || currentInputValue === null) && inputElVal.split('.').length - 1 <= 1);

    if (isInputValid) {
      return;
    } else if (!matchFormatRegex.test(inputElVal)) {
      this.value = this.preInputVal;
      this.requestUpdate();
      return;
    } else {
      this.checkFallbackValue(inputElVal);
    }
  }

  checkFallbackValue(inputElVal: string) {
    if (this.min && !this.max && Number(inputElVal) <= this.min) {
      this.value = this.min;
    } else if (this.max && !this.min && Number(inputElVal) >= this.max) {
      this.value = this.max;
    } else if (this.max && this.min) {
      this.value =
        Number(inputElVal) >= this.max ? this.max : Number(inputElVal) <= this.min ? this.min : Number(inputElVal);
    } else {
      this.value = Number(inputElVal);
    }
    this.requestUpdate();
  }

  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          stepper__container: true,
          disabled: this.disabled,
          stepper__container__focus: this._focusing,
        })}
      >
        <button
          part="minus_btn"
          id="minus_btn"
          class=${classMap({
            stepper__btn: true,
            disabled: this.disabled || this.minusDisabled,
          })}
          @click=${this.minus}
          role="none"
        >
          <slot name="minus">
            <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="-0.206055" y="-5" width="12" height="12" fill="#343538" />
            </svg>
          </slot>
        </button>
        <div
          class=${classMap({
            input_container: true,
            input__disabled: this.disabled,
          })}
        >
          <input
            part="stepper_input"
            type="text"
            .value=${live(this.value.toString())}
            class="stepper__input"
            ?disabled=${this.disabled}
            @focus=${this._handleFocus}
            @blur=${this._handleBlur}
            @input=${this._inputChange}
            @change=${this._inputBlur}
          />
        </div>
        <button
          part="plus_btn"
          id="plus_btn"
          class=${classMap({
            stepper__btn: true,
            disabled: this.disabled || this.plusDisabled,
          })}
          @click=${this.plus}
          role="none"
        >
          <slot name="plus">
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask
                id="mask0_1476_10794"
                style="mask-type:luminance"
                maskUnits="userSpaceOnUse"
                x="1"
                y="0"
                width="12"
                height="12"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.54395 0.75H6.04395V5.25H1.54395V6.75H6.04395V11.25H7.54395V6.75H12.0439V5.25H7.54395V0.75Z"
                  fill="white"
                />
              </mask>
              <g mask="url(#mask0_1476_10794)">
                <rect x="0.793945" width="12" height="12" fill="#343538" />
              </g>
            </svg>
          </slot>
        </button>
      </div>
    `;
  }
}
