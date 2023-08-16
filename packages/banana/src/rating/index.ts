import { CSSResultGroup, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import styles from './index.styles';
import { BananaFormElement, FormController } from 'packages/banana/controllers/form';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

@customElement('b-rating')
export default class BRating extends LitElement implements BananaFormElement {
  private readonly formController = new FormController(this);

  static styles?: CSSResultGroup = styles;

  private readonly defaultSymbol = html`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 0L15.5267 7.1459L23.4127 8.2918L17.7063 13.8541L19.0534 21.7082L12 18L4.94658 21.7082L6.29366 13.8541L0.587322 8.2918L8.47329 7.1459L12 0Z"
        fill="currentColor"
      />
    </svg>
  `;

  @state()
  _hoveringIndex: number | undefined;

  @state()
  _hoveringPercentage: number | undefined;

  // Internal value, which is used to calculate the active rating symbols, will not be submitted.
  @state()
  private _value = 0;

  @property()
  name = '';

  @property({ type: Number })
  value = 0;

  @property({ type: Number })
  defaultValue = 0;

  @property()
  form: string | undefined;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ attribute: false })
  character = this.defaultSymbol;

  @property({ type: Boolean, reflect: true })
  halfAllowed = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: Boolean, reflect: true })
  precision = false;

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  // Pass the reportValidity() method to the form controller.
  reportValidity() {
    return this.required ? this.value > 0 : true;
  }

  checkValidity() {
    return this.required ? this.value > 0 : true;
  }

  private _handleMouseEnter(index: number) {
    this._hoveringIndex = index;
  }

  private _handleMouseMove(event: MouseEvent) {
    const mouseX = event.clientX;
    const { left: symbolLeft, width: symbolWidth } = (event.target as HTMLElement).getBoundingClientRect();
    const percentage = Math.max(0, Math.floor(((mouseX - symbolLeft) / symbolWidth) * 100));
    // The 2 is a magic number, even if the mouse is on the right edge of the symbol, the percentage is not 100 but 98.
    this._hoveringPercentage = percentage + 2;
  }

  private _handleMouseLeave() {
    this._hoveringIndex = undefined;
    this._hoveringPercentage = undefined;
  }

  private _handleClick() {
    this.value = this._value;
  }

  private _handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Space' || event.key === 'Enter') {
      event.preventDefault();
      this.value = this._value;
    }
  }

  private _getActiveRatingSymbolClassMap = (index: number) => {
    return classMap({
      rating__symbol: true,
      'rating__symbol-active': true,
      'rating__symbol-active--full': !this.precision && index + 1 <= this._value,
      'rating__symbol-active--half':
        !this.precision && this.halfAllowed && index + 0.5 <= this._value && index + 1 > this._value,
    });
  };

  private _getActiveRatingSymbolStyle = (index: number) => {
    if (!this.precision) {
      return;
    }

    const width =
      this._value > index + 1
        ? 100
        : this._value > index && this._value < index + 1
        ? Math.floor((this._value - Math.floor(this._value)) * 100) ?? 0
        : 0;

    return `width: ${width}%;`;
  };

  protected firstUpdated(): void {
    this._value = this.value = this.defaultValue;
  }

  protected willUpdate(_changedProperties: PropertyValueMap<this>): void {
    if (_changedProperties.has('_hoveringIndex') || _changedProperties.has('_hoveringPercentage')) {
      if (this.readonly || this.disabled) {
        return;
      }

      if (this._hoveringIndex !== undefined && this._hoveringPercentage !== undefined) {
        if (this.precision) {
          this._value = this._hoveringIndex + this._hoveringPercentage / 100;
        } else if (this.halfAllowed) {
          this._value =
            this._hoveringIndex + this._hoveringPercentage > 50 ? this._hoveringIndex + 1 : this._hoveringIndex + 0.5;
        } else {
          this._value = this._hoveringIndex + 1;
        }
      } else {
        this._value = this.value;
      }
    }
  }

  render() {
    return html`
      <div
        part="base"
        class=${classMap({ rating: true, 'rating--readonly': this.readonly, 'rating--disabled': this.disabled })}
      >
        <ul class="rating__symbols" @mouseleave=${() => this._handleMouseLeave()}>
          ${Array.from({ length: 5 }).map(
            (_, index) => html`
              <li
                class="rating__symbol-container"
                role="radio"
                aria-checked="true"
                tabindex="0"
                aria-posinset=${index + 1}
                data-value=${index + 1}
                @mouseenter=${() => this._handleMouseEnter(index)}
                @mousemove=${this._handleMouseMove}
                @click=${this._handleClick}
                @keydown=${this._handleKeyDown}
              >
                <div>
                  <div
                    class=${this._getActiveRatingSymbolClassMap(index)}
                    style=${ifDefined(this._getActiveRatingSymbolStyle(index))}
                  >
                    ${this.character}
                  </div>
                  <div class="rating__symbol rating__symbol-background">${this.character}</div>
                </div>
              </li>
            `,
          )}
        </ul>
      </div>
    `;
  }
}
