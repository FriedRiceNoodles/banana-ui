/* eslint-disable lit-a11y/click-events-have-key-events */
import { CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { BananaFormElement, FormController } from '../../controllers/form';
import styles from './index.styles';

@customElement('b-input')
export default class BInput extends LitElement implements BananaFormElement {
  private readonly formController = new FormController(this);

  static styles?: CSSResultGroup = styles;

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  /* Properties */

  @property({ reflect: true })
  name = '';

  @property({ reflect: true })
  value = '';

  @property({ reflect: true, attribute: 'default-value' })
  defaultValue = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ reflect: true })
  placeholder: string | undefined;

  @property({ reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ reflect: true })
  type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' = 'text';

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: Boolean, reflect: true })
  controlled = false;

  // It seems like we will get a correct and specific type for autocomplete in the future(maybe TS5.2?).
  // See https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1467#issuecomment-1599747198
  // And https://github.com/microsoft/TypeScript/issues/52168
  @property({ reflect: true })
  autocomplete: HTMLInputElement['autocomplete'] | undefined;

  @property({ reflect: true })
  pattern: string | undefined;

  @property({ reflect: true, type: Number })
  minlength: number | undefined;

  @property({ reflect: true, type: Number })
  maxlength: number | undefined;

  @property({ reflect: true })
  min: number | string | undefined;

  @property({ reflect: true })
  max: number | string | undefined;

  /* State */

  @state()
  private _focusing = false;

  /* Queries */

  @query('.input')
  private _input!: HTMLInputElement;

  protected firstUpdated(): void {
    if (this.defaultValue !== '' && this.value === '') {
      this.value = this.defaultValue;
    }
  }

  /* Internal methods */

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

  private _handleChange(event: InputEvent) {
    event.stopPropagation();

    const value = this._input.value;

    // If the input element is controlled, the value will be updated by the host element.
    // So we dispatch a change event to notify the host element to update the value.
    if (this.controlled) {
      this._input.value = this.value;
    } else {
      this.value = value;
    }
    const eventOptions = { bubbles: false, cancelable: false, composed: true, detail: { value } };
    // The change event will not be dispatched when the value is changed programmatically.
    // Will dispatch the change event when the value is changed by user input but not native change event.
    this.dispatchEvent(new CustomEvent('change', eventOptions));
  }

  private _handleWrapperClick() {
    if (!this.disabled) {
      this._input.focus();
    }
  }

  private _handleInputKeyDown(event: KeyboardEvent) {
    const isKeyCombination = event.metaKey || event.ctrlKey || event.altKey || event.shiftKey;

    if (event.key === 'Enter' && !isKeyCombination && !event.isComposing) {
      this.formController.submit();
    }
  }

  /* Public methods */

  // Pass the reportValidity() method to the form controller.
  reportValidity() {
    return this._input.reportValidity();
  }

  checkValidity() {
    return this._input.checkValidity();
  }

  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          input__wrapper: true,
          'input__wrapper--small': this.size === 'small',
          'input__wrapper--medium': this.size === 'medium',
          'input__wrapper--large': this.size === 'large',
          'input__wrapper--focusing': this._focusing,
          'input__wrapper--disabled': this.disabled,
        })}
        @click="${this._handleWrapperClick}"
        aria-disabled=${this.disabled ? 'true' : 'false'}
      >
        <input
          part="input"
          class=${classMap({
            input: true,
            'input--small': this.size === 'small',
            'input--medium': this.size === 'medium',
            'input--large': this.size === 'large',
          })}
          name=${ifDefined(this.name)}
          .value=${live(this.value)}
          ?disabled=${this.disabled}
          placeholder=${ifDefined(this.placeholder)}
          minlength=${ifDefined(this.minlength)}
          maxlength=${ifDefined(this.maxlength)}
          min=${ifDefined(this.min)}
          max=${ifDefined(this.max)}
          type="${this.type}"
          ?required="${this.required}"
          autocomplete="${ifDefined(this.autocomplete)}"
          pattern="${ifDefined(this.pattern)}"
          @focus="${this._handleFocus}"
          @blur="${this._handleBlur}"
          @input="${this._handleChange}"
          @keydown="${this._handleInputKeyDown}"
        />
      </div>
    `;
  }
}
