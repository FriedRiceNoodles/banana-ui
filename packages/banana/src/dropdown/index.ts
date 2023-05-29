import { CSSResultGroup, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import styles from './index.styles';

@customElement('b-dropdown')
export default class BDivider extends LitElement {
  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this._openTimer);
    clearTimeout(this._closeTimer);
  }

  static styles: CSSResultGroup = styles;

  @query('.dropdown__trigger')
  _trigger: HTMLElement | undefined;

  @query('.dropdown__content')
  _content: HTMLElement | undefined;

  @property({ type: Boolean, reflect: true })
  initialOpen = false;

  // The distance from the dropdown content to the trigger.
  @property({ type: Number, reflect: true })
  margin = 4;

  // The time delay before dropdown content appears after mouse enter the trigger. Unit: ms.
  @property({ type: Number, reflect: true })
  mouseEnterDelay = 100;

  // The time delay before dropdown content disappears after mouse leave the dropdown content. Unit: ms.
  @property({ type: Number, reflect: true })
  mouseLeaveDelay = 100;

  @state()
  open = this.initialOpen;

  private _openTimer: ReturnType<typeof setTimeout> | undefined;

  private _closeTimer: ReturnType<typeof setTimeout> | undefined;

  private _onTriggerMouseEnter() {
    if (this.open) {
      clearTimeout(this._closeTimer);
    } else {
      const triggerHeight = this._trigger?.getBoundingClientRect().height ?? 0;
      if (this._content) {
        const distance = triggerHeight + this.margin;
        this._content.style.top = `${distance}px`;
      }

      this._openTimer = setTimeout(() => {
        this.open = true;
      }, this.mouseEnterDelay);
    }
  }

  private _onTriggerMouseLeave() {
    if (this.open) {
      this._closeTimer = setTimeout(() => {
        this.open = false;
      }, this.mouseLeaveDelay);
    } else {
      clearTimeout(this._openTimer);
    }
  }

  private _onContentMouseEnter() {
    clearTimeout(this._closeTimer);
  }

  private _onContentMouseLeave() {
    this._closeTimer = setTimeout(() => {
      this.open = false;
    }, this.mouseLeaveDelay);
  }

  render() {
    return html`
      <div
        class=${classMap({
          dropdown: true,
          'dropdown--open': this.open,
        })}
      >
        <div class="dropdown__trigger" @mouseenter=${this._onTriggerMouseEnter} @mouseleave=${this._onTriggerMouseLeave}>
          <slot part="trigger"></slot>
        </div>
        <div class="dropdown__content" @mouseenter=${this._onContentMouseEnter} @mouseleave=${this._onContentMouseLeave}>
          <slot name="drop"></slot>
        </div>
      </div>
    `;
  }
}
