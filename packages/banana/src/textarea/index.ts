/* eslint-disable lit-a11y/click-events-have-key-events */
import { CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { BananaFormElement, FormController } from 'packages/banana/controllers/form';
import styles from './index.styles';

@customElement('b-textarea')
export default class BTextarea extends LitElement implements BananaFormElement {
  private readonly formController = new FormController(this);

  static styles?: CSSResultGroup = styles;

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  @property()
  name = '';

  @property()
  value = '';

  /** The textarea's size. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** Placeholder text to show as a hint when the input is empty. */
  @property({ reflect: true }) placeholder: string | undefined;

  /** The number of rows to display by default. */
  @property({ type: Number }) rows = 4;

  /** The minimum length of input that will be considered valid. */
  @property({ type: Number }) minlength: number | undefined;

  /** The maximum length of input that will be considered valid. */
  @property({ type: Number }) maxlength: number | undefined;

  /** Controls whether and how text input is automatically capitalized as it is entered by the user. */
  @property() autocapitalize: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters' = 'off';

  /** Indicates whether the browser's autocorrect feature is on or off. */
  @property() autocorrect: 'off' | 'on' = 'on';

  /** Enables spell checking on the textarea. */
  @property({
    type: Boolean,
    converter: {
      // Allow "true|false" attribute values but keep the property boolean
      fromAttribute: (value) => (!value || value === 'false' ? false : true),
      toAttribute: (value) => (value ? 'true' : 'false'),
    },
  })
  spellcheck = true;

  /**
   * Tells the browser what type of data will be entered by the user, allowing it to display the appropriate virtual
   * keyboard on supportive devices.
   */
  @property() inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url' = 'text';

  /** Indicates that the input should receive focus on page load. */
  @property({ type: Boolean }) autofocus = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: Boolean, reflect: true })
  controlled = false;

  /* State */
  @state()
  private _focusing = false;

  @query('.textarea')
  private _textarea!: HTMLTextAreaElement;

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

    const value = this._textarea.value;

    // If the input element is controlled, the value will be updated by the host element.
    // So we dispatch a change event to notify the host element to update the value.
    if (this.controlled) {
      this._textarea.value = this.value;
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
      this._textarea.focus();
    }
  }

  // private _handleInputKeyDown(event: KeyboardEvent) {
  //   const isKeyCombination = event.metaKey || event.ctrlKey || event.altKey || event.shiftKey;

  //   if (event.key === 'Enter' && !isKeyCombination && !event.isComposing) {
  //     this.formController.submit();
  //   }
  // }

  // Pass the reportValidity() method to the form controller.
  reportValidity() {
    return this._textarea.reportValidity();
  }

  checkValidity() {
    return this._textarea.checkValidity();
  }

  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          textarea__wrapper: true,
          'textarea__wrapper--small': this.size === 'small',
          'textarea__wrapper--medium': this.size === 'medium',
          'textarea__wrapper--large': this.size === 'large',
          'textarea__wrapper--disabled': this.disabled,
          'textarea__wrapper--focusing': this._focusing,
        })}
        @click="${this._handleWrapperClick}"
        aria-disabled=${this.disabled ? 'true' : 'false'}
      >
        <textarea
          part="textarea"
          class=${classMap({
            textarea: true,
            'textarea__wrapper--small': this.size === 'small',
            'textarea__wrapper--medium': this.size === 'medium',
            'textarea__wrapper--large': this.size === 'large',
          })}
          name=${ifDefined(this.name)}
          .value=${live(this.value)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${ifDefined(this.placeholder)}
          rows=${ifDefined(this.rows)}
          minlength=${ifDefined(this.minlength)}
          maxlength=${ifDefined(this.maxlength)}
          autocapitalize=${ifDefined(this.autocapitalize)}
          autocorrect=${ifDefined(this.autocorrect)}
          ?autofocus=${this.autofocus}
          spellcheck=${ifDefined(this.spellcheck)}
          inputmode=${ifDefined(this.inputmode)}
          @change="${this._handleChange}"
          @input="${this._handleChange}"
          @focus="${this._handleFocus}"
          @blur="${this._handleBlur}"
        ></textarea>
      </div>
    `;
  }
}
