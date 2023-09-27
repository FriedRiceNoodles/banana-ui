/* eslint-disable lit-a11y/click-events-have-key-events */
// TODO: A11y——keyboard support

import { CSSResultGroup, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, query, queryAssignedElements, state } from 'lit/decorators.js';
import styles from './index.styles';
import { BananaFormElement, FormController } from 'packages/banana/controllers/form';
import '../button';
import { autoUpdate, computePosition, ComputePositionConfig, flip, offset } from '@floating-ui/dom';
import type BSelectOption from '../select-option';

@customElement('b-select')
export default class BSelect extends LitElement implements BananaFormElement {
  private readonly formController = new FormController(this);

  static styles?: CSSResultGroup = styles;

  @property()
  name = '';

  @property()
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

  // The distance from the selector to the listbox.
  @property({ type: Number, reflect: true })
  margin = 4;

  @property({ type: Boolean, reflect: true })
  autoAdjustOverflow = true;

  @state()
  open = false;

  @query('.select')
  _select: HTMLElement | undefined;

  @query('.select__listbox')
  _listbox: HTMLElement | undefined;

  @queryAssignedElements({ selector: 'b-select-option' })
  _options!: Array<BSelectOption>;

  // Pass the reportValidity() method to the form controller.
  reportValidity() {
    return this.required ? (this.value?.length || 0) > 0 : true;
  }

  checkValidity() {
    return this.required ? (this.value?.length || 0) > 0 : true;
  }

  private cleanup: ReturnType<typeof autoUpdate> | undefined;

  show() {
    this.open = true;
  }

  hide() {
    this.open = false;
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
    if (this.autoAdjustOverflow) middleware.push(flip());

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

  private _handleListboxClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.tagName.toLowerCase() !== 'b-select-option') return;
    if ((target as BSelectOption).disabled) return;

    const value = (target as BSelectOption).value;
    this._handleChange(value);
    this.hide();
  }

  private _handleChange(value: typeof this.value) {
    const eventOptions = { bubbles: false, cancelable: false, composed: true, detail: { value } };
    this.dispatchEvent(new CustomEvent('change', eventOptions));
    if (this.controlled) return;
    this.value = value;
  }

  protected firstUpdated(): void {
    if (this.defaultValue !== undefined && !this.value) {
      this.value = this.defaultValue;
    }

    if (!this._select || !this._listbox) return;

    this._listbox.hidden = true;
  }

  protected willUpdate(changedProperties: PropertyValueMap<this>): void {
    if (!this._select || !this._listbox) return;

    if (changedProperties.has('open')) {
      const eventOptions = { bubbles: false, cancelable: false, composed: true };

      if (this.open) {
        this._listbox.hidden = false;

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
            this._listbox.hidden = true;
            this.dispatchEvent(new CustomEvent('afterHide', eventOptions));
          } else {
            this.dispatchEvent(new CustomEvent('afterShow', eventOptions));
          }
        }
      };

      window.requestAnimationFrame(step);
    }

    if (changedProperties.has('value')) {
      for (const option of this._options) {
        if (option.value === this.value && !option.disabled) {
          option.selected = true;
        } else {
          option.selected = false;
        }
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._onDocumentClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._onDocumentClick);
    this.cleanup?.();
  }

  render() {
    return html`
      <div class="select">
        <div class="select__selector" @click=${this.show}>
          <b-button class="select__selector-trigger">
            <span>${this.value}</span>
            <svg
              t="1682003769967"
              class="default-expand-icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="933"
              width="16"
              height="16"
            >
              <path
                d="M731.733333 480l-384-341.333333c-17.066667-14.933333-44.8-14.933333-59.733333 4.266666-14.933333 17.066667-14.933333 44.8 4.266667 59.733334L640 512 292.266667 821.333333c-17.066667 14.933333-19.2 42.666667-4.266667 59.733334 8.533333 8.533333 19.2 14.933333 32 14.933333 10.666667 0 19.2-4.266667 27.733333-10.666667l384-341.333333c8.533333-8.533333 14.933333-19.2 14.933334-32s-4.266667-23.466667-14.933334-32z"
                fill="#666666"
                p-id="934"
              ></path></svg
          ></b-button>
        </div>

        <div class="select__listbox" part="listbox" role="listbox" @click=${this._handleListboxClick}>
          <slot></slot>
        </div>
      </div>
    `;
  }
}
