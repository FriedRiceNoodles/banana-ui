/* eslint-disable lit-a11y/click-events-have-key-events */

import { autoUpdate, computePosition, ComputePositionConfig, flip, offset } from '@floating-ui/dom';
import { CSSResultGroup, html, LitElement, nothing, PropertyValueMap } from 'lit';
import { customElement, property, query, queryAssignedElements, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { BananaFormElement, FormController } from 'packages/banana/controllers/form';
import type BSelectOption from '../select-option';
import styles from './index.styles';

@customElement('b-select')
export default class BSelect extends LitElement implements BananaFormElement {
  private readonly formController = new FormController(this);

  static styles?: CSSResultGroup = styles;

  @property()
  name = '';

  // If multiple is true, the value will be an array.
  // An array-type value property will be converted to a string-type attribute by joining with spaces.
  // Otherwise we can't pass multiple values in the HTML.
  @property({
    converter: {
      toAttribute: (value: string[] | string) => (Array.isArray(value) ? value.join(' ') : value),
    },
  })
  value: string | string[] = '';

  @property({
    reflect: true,
    attribute: 'default-value',
    converter: {
      toAttribute: (value: string[] | string) => (Array.isArray(value) ? value.join(' ') : value),
    },
  })
  defaultValue: string | string[] = '';

  @property()
  form: string | undefined;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  required = false;

  // todo
  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: Boolean, reflect: true })
  controlled = false;

  @property()
  placeholder = '';

  @property({ reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  // The distance from the selector to the listbox.
  @property({ type: Number, reflect: true })
  margin = 4;

  @property({ type: Boolean, reflect: true, attribute: 'disable-auto-adjust-overflow' })
  disableAutoAdjustOverflow = false;

  // Whether the width of the listbox is synchronized with the width of the selector.
  @property({ type: Boolean, reflect: true, attribute: 'disable-width-sync' })
  disableWidthSync = false;

  @property({ type: Boolean, reflect: true })
  multiple = false;

  @property({ type: Boolean, reflect: true })
  clearable = false;

  // Whether to hide the listbox when clearing the value(no matter the value is actually cleared or not).
  @property({ type: Boolean, reflect: true, attribute: 'no-hide-on-clear' })
  noHideOnClear = false;

  @property({ type: Boolean, reflect: true, attribute: 'default-open' })
  defaultOpen = false;

  // Default filter, it will filter the options by the value of the filter input. (string includes, case-insensitive)
  @property({ type: Boolean, reflect: true })
  filter = false;

  // TODO: Custom filter function.
  // @property({ attribute: false})
  // customFilter: (option: BSelectOption, filterValue: string) => boolean;

  @state()
  open = false;

  // Only one option can be active at a time.
  @state()
  activeOption = '';

  @state()
  filterInputValue = '';

  @query('.select')
  _select: HTMLElement | undefined;

  @query('.select__listbox')
  _listbox: HTMLElement | undefined;

  @query('.select__validation-input')
  private _validationInput!: HTMLInputElement;

  @query('.select-selector__filter')
  private _filterInput: HTMLInputElement | undefined;

  @queryAssignedElements({ selector: 'b-select-option' })
  _options!: Array<BSelectOption>;

  private get _validOptions() {
    return this._options.filter(
      (option) =>
        !option.disabled && option.value !== '' && !option.hidden && !option.hasAttribute('data-filter-hidden'),
    );
  }

  private get _isEmpty() {
    return this.multiple ? (this.value as string[]).length === 0 : this.value === '';
  }

  // Pass the reportValidity() method to the form controller.
  reportValidity() {
    return this._validationInput.reportValidity();
  }

  checkValidity() {
    return this._validationInput.checkValidity();
  }

  private cleanup: ReturnType<typeof autoUpdate> | undefined;

  show() {
    this.open = true;
    // Make the (first) selected option active.
    if (this.multiple) {
      const firstSelectedOption = this._options.find((option) => this.value.includes(option.value));
      if (firstSelectedOption) {
        this.activeOption = firstSelectedOption.value;
      }
    } else {
      // Value will be a string if multiple is false.
      this.activeOption = this.value as string;
    }
    // If there is no active option, the first option will be activated by default.
    if (!this.activeOption.length) {
      const firstOption = this._options.find((option) => !option.disabled && option.value !== '');
      if (firstOption) {
        this.activeOption = firstOption.value;
      }
    }
  }

  hide() {
    this.open = false;
    this.activeOption = '';
  }

  // Disabled or value-less options are not allowed to be selected.
  private _isOptionSelected(option: BSelectOption) {
    if (this.multiple) {
      return this.value.includes(option.value) && !option.disabled && option.value !== '';
    } else {
      return this.value === option.value && !option.disabled && option.value !== '';
    }
  }

  // Disabled or value-less options are not allowed to be activated.
  private _isActivedOption(option: BSelectOption) {
    return this.activeOption === option.value && !option.disabled && option.value !== '';
  }

  private _onDocumentClick = (event: MouseEvent) => {
    if (!this._select || !this._listbox) return;
    // If the click event is triggered by the select element, do nothing.
    const path = event.composedPath();
    if (path.includes(this._select)) return;

    this.hide();
  };

  private _repositioning() {
    if (!this._select || !this._listbox) return;
    const middleware: ComputePositionConfig['middleware'] = [offset(this.margin)];
    if (!this.disableAutoAdjustOverflow) middleware.push(flip());

    void computePosition(this._select, this._listbox, {
      placement: 'bottom-start',
      middleware: middleware,
    }).then(({ x, y }) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      Object.assign(this._listbox!.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });
  }

  private _handleArrowUp() {
    if (this.open) {
      const index = this._options.findIndex((option) => option.value === this.activeOption);
      if (index === -1) return;
      // Allow loop and skip disabled or value-less options.
      const findPrevOption = (index: number): BSelectOption => {
        const prevOption = this._validOptions[index - 1];
        if (!prevOption) {
          return findPrevOption(this._validOptions.length);
        }
        return prevOption;
      };
      const prevOption = findPrevOption(index);
      this.activeOption = prevOption.value;
    } else {
      this.show();
    }
  }

  private _handleArrowDown() {
    if (this.open) {
      const index = this._options.findIndex((option) => option.value === this.activeOption);
      if (index === -1) return;
      // Allow loop and skip disabled or value-less options.
      const findNextOption = (index: number): BSelectOption => {
        const nextOption = this._validOptions[index + 1];
        if (!nextOption) {
          return findNextOption(-1);
        }
        return nextOption;
      };
      const nextOption = findNextOption(index);
      this.activeOption = nextOption.value;
    } else {
      this.show();
    }
  }

  private _handleSelectorClick(event: MouseEvent) {
    event.stopPropagation();
    if (this.disabled) return;
    if (this.open) {
      // Don't hide the listbox when searching.
      if (!(this.filter && this.filterInputValue.length)) {
        this.hide();
      }
    } else {
      this.show();
    }
  }

  private _handleFilterClick(event: MouseEvent) {
    event.stopPropagation();
    if (this.open && !this.filterInputValue.length) {
      this.hide();
    }
  }

  private _handleKeyDown(event: KeyboardEvent) {
    event.stopPropagation();

    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        if (this.open) {
          const activeOption = this._options.find((option) => option.value === this.activeOption);
          if (activeOption) {
            this._handleOptionChoose(activeOption.value);
          }
          if (!this.multiple) {
            this.hide();
          }
        } else {
          this.show();
        }
        break;
      case 'Escape':
        this.hide();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this._handleArrowUp();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this._handleArrowDown();
        break;
      default:
        break;
    }
  }

  private _handleBlur() {
    this.hide();
  }

  private _handleListboxClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const option = target.closest('b-select-option') as BSelectOption;
    if (!option || option.disabled) return;

    const value = option.value;
    this._handleOptionChoose(value);
    if (!this.multiple) {
      this.hide();
    }
  }

  private _handleListboxMousemove(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const option = target.closest('b-select-option') as BSelectOption;
    if (option && !option.disabled) {
      this.activeOption = option.value;
    }
  }

  private _handleOptionChoose(value: string) {
    if (this.multiple) {
      let newValue: string[];
      if (this.value.includes(value)) {
        newValue = (this.value as string[]).filter((v) => v !== value);
      } else {
        newValue = [...this.value, value];
      }
      this._handleChange(newValue);
    } else {
      this._handleChange(value);
    }
  }

  private _handleMultipleOptionClose(event: MouseEvent) {
    event.stopPropagation();
    const target = event.target as HTMLElement;
    const value = (target.closest('.select-selector__multiple-option-close') as HTMLElement).dataset.value;
    if (!value) return;
    this._handleOptionChoose(value);
  }

  private _handleClearIconClick(event: MouseEvent) {
    event.stopPropagation();
    if (this.multiple) {
      this._handleChange([]);
    } else {
      this._handleChange('');
    }

    if (!this.noHideOnClear && !(this.filter && this.open)) {
      this.hide();
    }

    if (this.filter && this._filterInput) {
      this._filterInput.focus();
      this.filterInputValue = '';
    }
  }

  private _handleChange(value: typeof this.value) {
    const eventOptions = { bubbles: false, cancelable: false, composed: true, detail: { value } };
    this.dispatchEvent(new CustomEvent('change', eventOptions));
    if (this.controlled) return;
    this.value = value;
  }

  private _handleSlotChange() {
    this.requestUpdate();
  }

  private _handleFilterInput(event: InputEvent) {
    const value = (event.target as HTMLInputElement).value;
    this.filterInputValue = value;
  }

  private _handleFilterChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.filterInputValue = value;
  }

  private _convertAttributeWhenMultiple() {
    if (this.multiple && typeof this.value === 'string') {
      this.value = this.value.length > 0 ? this.value.split(' ') : [];
    }
  }

  protected firstUpdated(): void {
    if (this.defaultOpen && !this.disabled) {
      this.open = true;
    }

    if (this.defaultValue !== undefined && !this.value) {
      this.value = this.defaultValue;
    }

    // It should be after the default value is set.
    this._convertAttributeWhenMultiple();

    if (!this._select || !this._listbox) return;

    this._listbox.hidden = true;
  }

  protected willUpdate(changedProperties: PropertyValueMap<this>): void {
    if (!this._select || !this._listbox) return;

    // If select is disabled, hide the listbox.
    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this.hide();
      }
    }

    if (changedProperties.has('value')) {
      this._convertAttributeWhenMultiple();

      for (const option of this._options) {
        // Empty value is not allowed.
        if (this._isOptionSelected(option)) {
          option.selected = true;
        } else {
          option.selected = false;
        }
      }
    }

    if (changedProperties.has('activeOption')) {
      for (const option of this._options) {
        if (this._isActivedOption(option)) {
          option.active = true;
        } else {
          option.active = false;
        }
      }
    }

    if (changedProperties.has('filterInputValue')) {
      if (this.filter) {
        this._options.forEach((option) => {
          // Hide the option if the text content does not contain the filter value. (case-insensitive)
          // Do not control the display of the option by setting `hidden` attribute, because developers may want to use it for other purposes.
          option.toggleAttribute(
            'data-filter-hidden',
            !option.innerText.toLowerCase().includes(this.filterInputValue.toLowerCase()),
          );
        });
      }
    }
  }

  protected updated(changedProperties: PropertyValueMap<this>): void {
    if (!this._select || !this._listbox) return;

    if (changedProperties.has('open')) {
      const eventOptions = { bubbles: false, cancelable: false, composed: true };

      if (this.open && !this.disabled) {
        this._listbox.hidden = false;

        // Focus the filter input when the listbox is opened.
        if (this.filter && this._filterInput) {
          this._filterInput.focus();
        }

        // Width sync.
        if (!this.disableWidthSync) {
          const width = this._select.getBoundingClientRect().width;
          this._listbox.style.width = `${width}px`;
        }

        this.cleanup?.();
        this.cleanup = autoUpdate(this._select, this._listbox, () => this._repositioning());

        this.dispatchEvent(new CustomEvent('show', eventOptions));
      } else {
        this.cleanup?.();
        this.cleanup = undefined;

        this.dispatchEvent(new CustomEvent('hide', eventOptions));
      }

      const startOpacity = this.open ? 0 : 1;
      const target = this.open ? 1 : 0;
      const duration = 150;

      let start: number;

      const step = (timestamp: number) => {
        if (!this._select || !this._listbox) return;
        if (start === undefined) {
          start = timestamp;
        }

        // How much time has passed...
        const elapsed = timestamp - start;

        if (this.open) {
          const result = String(Math.min((target * elapsed) / duration, target).toFixed(3));
          this._listbox.style.opacity = result;
        } else {
          const result = String(Math.max(startOpacity - (startOpacity * elapsed) / duration, target).toFixed(3));
          this._listbox.style.opacity = result;
        }

        if (elapsed <= duration) {
          window.requestAnimationFrame(step);
        } else {
          if (!this.open) {
            // Clear the filter input value when the listbox is closed.
            if (this.filter && this._filterInput) {
              this.filterInputValue = '';
            }

            this._listbox.hidden = true;
            this.dispatchEvent(new CustomEvent('afterHide', eventOptions));
          } else {
            this.dispatchEvent(new CustomEvent('afterShow', eventOptions));
          }
        }
      };

      window.requestAnimationFrame(step);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._onDocumentClick);
    this.addEventListener('keydown', this._handleKeyDown);
    this.addEventListener('blur', this._handleBlur);
    this.setAttribute('tabindex', '0');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._onDocumentClick);
    this.removeEventListener('keydown', this._handleKeyDown);
    this.removeEventListener('blur', this._handleBlur);
    this.cleanup?.();
  }

  render() {
    const currentOptions = this.multiple
      ? this._options.filter((option) => (this.value as string[]).includes(option.value))
      : this._options.filter((option) => option.value === this.value);

    const multipleOptions = this.multiple
      ? html`
          <div class="select-selector__multiple-options-container">
            ${currentOptions.map(
              (option) =>
                html`
                  <div class="select-selector__multiple-option">
                    <span class="select-selector__multiple-option-text" title=${option.innerText}>
                      ${option.innerText}
                    </span>
                    <span
                      class="select-selector__multiple-option-close"
                      data-value=${option.value}
                      @click=${this._handleMultipleOptionClose}
                    >
                      <svg
                        t="1699006460233"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="1792"
                        width="12"
                        height="12"
                        fill="currentColor"
                      >
                        <path
                          d="M240.448 168l2.346667 2.154667 289.92 289.941333 279.253333-279.253333a42.666667 42.666667 0 0 1 62.506667 58.026666l-2.133334 2.346667-279.296 279.210667 279.274667 279.253333a42.666667 42.666667 0 0 1-58.005333 62.528l-2.346667-2.176-279.253333-279.253333-289.92 289.962666a42.666667 42.666667 0 0 1-62.506667-58.005333l2.154667-2.346667 289.941333-289.962666-289.92-289.92a42.666667 42.666667 0 0 1 57.984-62.506667z"
                          p-id="1794"
                        ></path>
                      </svg>
                    </span>
                  </div>
                `,
            )}
          </div>
        `
      : nothing;

    return html`
      <div
        class=${classMap({
          select: true,
          'select--disabled': this.disabled,
        })}
        part="base"
      >
        <input
          class="select__validation-input"
          .value=${Array.isArray(this.value) ? this.value.join(', ') : this.value}
          ?required=${this.required}
        />

        <div
          class=${classMap({
            select__selector: true,
            'select__selector--disabled': this.disabled,
            'select__selector--active': this.open,
            'select__selector--multiple': this.multiple,
            'select__selector--clearable': this.clearable && (!this._isEmpty || this.filterInputValue.length),
            'select__selector--searching': this.filter && this.open,
            'select__selector--small': this.size === 'small',
            'select__selector--medium': this.size === 'medium',
            'select__selector--large': this.size === 'large',
          })}
          @click=${this._handleSelectorClick}
        >
          ${this.value.length
            ? this.multiple
              ? multipleOptions
              : html`
                  <span class="select-selector__title" ?hidden=${this.open}>
                    ${unsafeHTML(currentOptions[0]?.innerHTML)}
                  </span>
                `
            : html`<span class="select-selector__placeholder" ?hidden=${this.open}>${this.placeholder}</span>`}
          ${this.filter
            ? html`
                <div class="select-selector__filter-container" ?hidden=${!this.open}>
                  <input
                    class="select-selector__filter"
                    placeholder=${this.placeholder}
                    @click=${this._handleFilterClick}
                    @input=${this._handleFilterInput}
                    @change=${this._handleFilterChange}
                    .value=${live(this.filterInputValue)}
                    type="search"
                    tabindex="-1"
                  />
                </div>
              `
            : nothing}
          <div class="select__selector-icons-container">
            <div class="select__selector-icon expand-icon-container">
              <slot name="selector-icon-expand">
                <svg class="default-expand-icon" width="12" height="12" viewBox="0 0 1024 1024">
                  <path
                    d="M731.733333 480l-384-341.333333c-17.066667-14.933333-44.8-14.933333-59.733333 4.266666-14.933333 17.066667-14.933333 44.8 4.266667 59.733334L640 512 292.266667 821.333333c-17.066667 14.933333-19.2 42.666667-4.266667 59.733334 8.533333 8.533333 19.2 14.933333 32 14.933333 10.666667 0 19.2-4.266667 27.733333-10.666667l384-341.333333c8.533333-8.533333 14.933333-19.2 14.933334-32s-4.266667-23.466667-14.933334-32z"
                    fill="currentColor"
                  ></path>
                </svg>
              </slot>
            </div>
            <div class="select__selector-icon clear-icon-container" @click=${this._handleClearIconClick}>
              <slot name="selector-icon-clear">
                <svg class="clear-icon" viewBox="0 0 1024 1024" width="12" height="12">
                  <path
                    d="M512 949.333333C270.933333 949.333333 74.666667 753.066667 74.666667 512S270.933333 74.666667 512 74.666667 949.333333 270.933333 949.333333 512 753.066667 949.333333 512 949.333333z m-151.466667-292.266666c10.666667 10.666667 29.866667 12.8 42.666667 2.133333l2.133333-2.133333 104.533334-102.4 102.4 102.4 2.133333 2.133333c12.8 10.666667 32 8.533333 42.666667-2.133333 12.8-12.8 12.8-32 0-44.8L554.666667 509.866667l102.4-102.4 2.133333-2.133334c10.666667-12.8 8.533333-32-2.133333-42.666666s-29.866667-12.8-42.666667-2.133334l-2.133333 2.133334-102.4 102.4-102.4-102.4-2.133334-2.133334c-12.8-10.666667-32-8.533333-42.666666 2.133334-12.8 12.8-12.8 32 0 44.8l102.4 102.4-102.4 102.4-2.133334 2.133333c-10.666667 12.8-10.666667 32 0 42.666667z"
                    fill="currentColor"
                  ></path>
                </svg>
              </slot>
            </div>
            <div class="select__selector-icon search-icon-container">
              <slot name="selector-icon-search">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" class="search-icon">
                  <path
                    d="M10.3345 11.7488C9.25957 12.5354 7.93402 12.9999 6.49995 12.9999C2.91014 12.9999 0 10.0897 0 6.49995C0 2.91014 2.91014 0 6.49995 0C10.0897 0 12.9999 2.91014 12.9999 6.49995C12.9999 7.93402 12.5354 9.25957 11.7488 10.3345L15.7071 14.2927C16.0976 14.6834 16.0976 15.3164 15.7071 15.7071C15.3164 16.0976 14.6834 16.0976 14.2927 15.7071L10.3345 11.7488ZM6.49996 10.9999C8.98517 10.9999 10.9999 8.98517 10.9999 6.49996C10.9999 4.01475 8.98517 2 6.49996 2C4.01469 2 2 4.01475 2 6.49996C2 8.98517 4.01469 10.9999 6.49996 10.9999Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </slot>
            </div>
          </div>
        </div>

        <div
          class="select__listbox"
          part="listbox"
          role="listbox"
          @click=${this._handleListboxClick}
          @mousemove=${this._handleListboxMousemove}
          aria-expanded=${this.open ? 'true' : 'false'}
          aria-controls="listbox"
        >
          <slot @slotchange=${this._handleSlotChange}></slot>
        </div>
      </div>
    `;
  }
}
