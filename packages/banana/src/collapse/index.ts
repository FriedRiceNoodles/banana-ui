import { CSSResultGroup, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
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

  static styles?: CSSResultGroup = styles;

  @property({ reflect: true })
  title = '';

  @property({ type: Boolean, reflect: true })
  open = false;

  public show() {
    this.open = true;
  }

  public hide() {
    this.open = false;
  }

  private _onHeaderClick() {
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
    this.body.hidden = !this.open;
  }

  protected updated(changedProperties: PropertyValueMap<this>): void {
    if (changedProperties.has('open')) {
      if (this.open) {
        this.body.hidden = false;
      }
      const startHeight = this.body.scrollHeight;
      const target = this.open ? startHeight : 0;
      const duration = 150;

      let start: number;

      const func = (timestamp: number) => {
        if (start === undefined) {
          start = timestamp;
        }

        const elapsed = timestamp - start;

        if (this.open) {
          const count = Math.min((startHeight * elapsed) / duration, target);
          this.body.style.height = `${count}px`;
        } else {
          const count = Math.max(startHeight - (startHeight * elapsed) / duration, target);
          this.body.style.height = `${count}px`;
        }

        if (elapsed <= duration) {
          window.requestAnimationFrame(func);
        } else {
          if (!this.open) {
            this.body.hidden = true;
          }
        }
      };

      window.requestAnimationFrame(func);
    }
  }

  render() {
    // todo:
    //   1. Add disabled attribute
    //   2. When disabled is true, tabindex should be '-1'
    return html`
      <div
        part="base"
        class=${classMap({
          collapse: true,
          'collapse--open': this.open,
        })}
      >
        <div
          part="header"
          class="collapse__header"
          @click="${this._onHeaderClick}"
          @keydown="${this._onHeaderKeyDown}"
          role="button"
          aria-expanded=${this.open ? 'true' : 'false'}
          aria-controls="content"
          tabindex="0"
        >
          <div class="collapse__title">
            <slot name="title">${this.title}</slot>
          </div>

          <slot name="expand-icon">
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
          <slot name="collapse-icon"></slot>
        </div>
        <div class="collapse__body">
          <slot part="content" class="collapse__content"></slot>
        </div>
      </div>
    `;
  }
}
