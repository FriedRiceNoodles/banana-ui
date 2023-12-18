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
    this.value = this.checkFallbackValue(this.input.value);
  }

  protected willUpdate(changedProperties: PropertyValueMap<this>): void {
    if (changedProperties.has('value')) {
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
    const minusResult = MathUtils.minus(this.value, this.step);
    let result;
    if (!this.min || (this.min && this.value > this.min && minusResult >= this.min)) {
      result = minusResult;
    } else {
      result = this.min;
    }

    if (!this.controlled) {
      this.value = result;
    }

    const eventOptions = { bubbles: false, cancelable: false, composed: true, detail: { value: result } };
    this.dispatchEvent(new CustomEvent('change', eventOptions));
  }

  plus() {
    if (this.disabled || this.plusDisabled) return;
    const plusResult = MathUtils.add(this.value, this.step);
    let result;
    if (!this.max || (this.max && this.value < this.max && plusResult <= this.max)) {
      result = plusResult;
    } else {
      result = this.max;
    }

    if (!this.controlled) {
      this.value = result;
    }

    const eventOptions = { bubbles: false, cancelable: false, composed: true, detail: { value: result } };
    this.dispatchEvent(new CustomEvent('change', eventOptions));
  }

  private _inputBlur(e: FocusEvent) {
    const inputElValue = this.input.value;

    this._handleBlur(e);

    if (!inputElValue || isNaN(Number(inputElValue))) {
      const result = this.min ? this.min : 0;

      if (this.value === result) {
        return;
      }

      if (!this.controlled) {
        this.value = result;
      }

      const eventOptions = { bubbles: false, cancelable: false, composed: true, detail: { value: result } };
      this.dispatchEvent(new CustomEvent('change', eventOptions));
      return;
    }

    const result = this.integer
      ? Math.floor(this.checkFallbackValue(inputElValue))
      : this.checkFallbackValue(inputElValue);

    if (this.value === result) {
      return;
    }

    if (!this.controlled) {
      this.value = result;
    }

    const eventOptions = { bubbles: false, cancelable: false, composed: true, detail: { value: result } };
    this.dispatchEvent(new CustomEvent('change', eventOptions));
  }

  checkFallbackValue(inputElVal: string) {
    let result;
    if (this.min && !this.max && Number(inputElVal) <= this.min) {
      result = this.min;
    } else if (this.max && !this.min && Number(inputElVal) >= this.max) {
      result = this.max;
    } else if (this.max && this.min) {
      result =
        Number(inputElVal) >= this.max ? this.max : Number(inputElVal) <= this.min ? this.min : Number(inputElVal);
    } else {
      result = Number(inputElVal);
    }

    return result;
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
          <b-input
            part="stepper_input"
            type="number"
            .value=${live(this.value.toString())}
            class="stepper__input"
            ?disabled=${this.disabled}
            @focus=${this._handleFocus}
            @blur=${this._inputBlur}
          ></b-input>
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
