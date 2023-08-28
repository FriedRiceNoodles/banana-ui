import { CSSResultGroup, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, query, queryAssignedElements } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import styles from './index.styles';

@customElement('b-collapse')
export default class BCollapse extends LitElement {
  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  @query('.collapse__header')
  header!: HTMLElement;

  @query('.collapse__body')
  body!: HTMLElement;

  @queryAssignedElements({ slot: 'collapse-icon' })
  customCollapseIcon: Array<HTMLElement> | undefined;

  static styles?: CSSResultGroup = styles;

  @property({ reflect: true })
  title = '';

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  public show() {
    if (this.disabled) return;
    this.open = true;
  }

  public hide() {
    if (this.disabled) return;
    this.open = false;
  }

  private _onHeaderClick() {
    if (this.disabled) return;

    this.header.focus();

    if (this.open) {
      this.hide();
    } else {
      this.show();
    }
  }

  private _onHeaderKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();

      if (this.open) {
        this.hide();
      } else {
        this.show();
      }
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      this.hide();
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      this.show();
    }
  }

  protected firstUpdated(): void {
    if (this.disabled) this.open = false;
    this.body.hidden = !this.open;
  }

  protected updated(changedProperties: PropertyValueMap<this>): void {
    if (changedProperties.has('open')) {
      const eventOptions = { bubbles: false, cancelable: false, composed: true };

      if (this.open) {
        this.body.hidden = false;
        this.dispatchEvent(new CustomEvent('show', eventOptions));
      } else {
        this.dispatchEvent(new CustomEvent('hide', eventOptions));
      }
      const startHeight = this.body.scrollHeight;
      const target = this.open ? startHeight : 0;
      const duration = 150;

      let start: number;

      const step = (timestamp: number) => {
        if (start === undefined) {
          start = timestamp;
        }

        // How much time has passed...
        const elapsed = timestamp - start;

        if (this.open) {
          const result = Math.min((startHeight * elapsed) / duration, target);
          this.body.style.height = `${result}px`;
        } else {
          const result = Math.max(startHeight - (startHeight * elapsed) / duration, target);
          this.body.style.height = `${result}px`;
        }

        if (elapsed <= duration) {
          window.requestAnimationFrame(step);
        } else {
          if (!this.open) {
            this.body.hidden = true;
            this.dispatchEvent(new CustomEvent('afterHide', eventOptions));
          } else {
            this.dispatchEvent(new CustomEvent('afterShow', eventOptions));
          }
        }
      };

      window.requestAnimationFrame(step);
    }
  }

  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          collapse: true,
          'collapse--open': !this.disabled && this.open,
          'collapse--disabled': this.disabled,
        })}
      >
        <div
          part="header"
          class="collapse__header"
          @click="${this._onHeaderClick}"
          @keydown="${this._onHeaderKeyDown}"
          role="button"
          aria-expanded=${!this.disabled && this.open ? 'true' : 'false'}
          aria-controls="content"
          tabindex=${this.disabled ? '-1' : '0'}
        >
          <div class="collapse__title">
            <slot name="title">${this.title}</slot>
          </div>

          <div class="collapse__icon">
            <slot name="expand-icon" ?hidden=${this.open && (this.customCollapseIcon?.length ?? 0) > 0}>
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
                ></path>
              </svg>
            </slot>
            <slot name="collapse-icon" ?hidden=${!this.open}></slot>
          </div>
        </div>
        <div class="collapse__body">
          <slot part="content" class="collapse__content"></slot>
        </div>
      </div>
    `;
  }
}
