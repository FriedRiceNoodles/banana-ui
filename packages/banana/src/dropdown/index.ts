import { CSSResultGroup, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ComputePositionConfig, computePosition, offset, flip } from '@floating-ui/dom';
import styles from './index.styles';

type Placement = 'bottomLeft' | 'bottom' | 'bottomRight' | 'topLeft' | 'top' | 'topRight';
const placementMap = new Map<Placement, ComputePositionConfig['placement']>([
  ['bottom', 'bottom'],
  ['bottomLeft', 'bottom-start'],
  ['bottomRight', 'bottom-end'],
  ['top', 'top'],
  ['topLeft', 'top-start'],
  ['topRight', 'top-end'],
]);

@customElement('b-dropdown')
export default class BDropdown extends LitElement {
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
  disabled = false;

  // The distance from the dropdown content to the trigger.
  @property({ type: Number, reflect: true })
  margin = 4;

  // The time delay before dropdown content appears after mouse enter the trigger. Unit: ms.
  @property({ type: Number, reflect: true })
  mouseEnterDelay = 100;

  // The time delay before dropdown content disappears after mouse leave the dropdown content. Unit: ms.
  @property({ type: Number, reflect: true })
  mouseLeaveDelay = 100;

  @property({ reflect: true })
  placement: Placement = 'bottomLeft';

  @property({ type: Boolean, reflect: true })
  autoAdjustOverflow = true;

  @state()
  open = false;

  private _openTimer: ReturnType<typeof setTimeout> | undefined;

  private _closeTimer: ReturnType<typeof setTimeout> | undefined;

  private _repositioning() {
    if (!this._trigger || !this._content) return;

    const middleware: ComputePositionConfig['middleware'] = [offset(this.margin)];
    if (this.autoAdjustOverflow) middleware.push(flip());

    void computePosition(this._trigger, this._content, {
      placement: placementMap.get(this.placement),
      middleware: middleware,
    }).then(({ x, y }) => {
      Object.assign((this._content as HTMLElement).style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });
  }

  private _onTriggerMouseEnter() {
    if (this.open) {
      clearTimeout(this._closeTimer);
    } else {
      this._openTimer = setTimeout(() => {
        this.open = true;
        this._repositioning();
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

  protected firstUpdated(): void {
    if (!this._trigger || !this._content) return;

    // Pass an `open` attribute directly is not allowed.
    this.open = false;
    this._content.hidden = true;
  }

  protected willUpdate(changedProperties: PropertyValueMap<this>): void {
    if (!this._trigger || !this._content) return;

    if (changedProperties.has('open')) {
      const eventOptions = { bubbles: false, cancelable: false, composed: true };

      if (this.open) {
        this._content.hidden = false;
        this.dispatchEvent(new CustomEvent('show', eventOptions));
      } else {
        this.dispatchEvent(new CustomEvent('hide', eventOptions));
      }

      const startOpacity = this.open ? 0 : 1;
      const target = this.open ? 1 : 0;
      const duration = 150;

      let start: number;

      const step = (timestamp: number) => {
        // For eslint, do not delete this line or you will get some problems.
        if (!this._trigger || !this._content) return;

        if (start === undefined) {
          start = timestamp;
        }

        // How much time has passed...
        const elapsed = timestamp - start;

        if (this.open) {
          const result = String(Math.min((target * elapsed) / duration, target).toFixed(3));
          this._content.style.opacity = result;
        } else {
          const result = String(Math.max(startOpacity - (startOpacity * elapsed) / duration, target).toFixed(3));
          this._content.style.opacity = result;
        }

        if (elapsed <= duration) {
          window.requestAnimationFrame(step);
        } else {
          if (!this.open) {
            this._content.hidden = true;
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
        class=${classMap({
          dropdown: true,
          'dropdown--open': this.open,
          'dropdown--disabled': this.disabled,
        })}
        placement=${this.placement}
        part="base"
      >
        <div class="dropdown__trigger" @mouseenter=${this._onTriggerMouseEnter} @mouseleave=${this._onTriggerMouseLeave} part="trigger">
          <slot></slot>
        </div>
        <div class="dropdown__content" @mouseenter=${this._onContentMouseEnter} @mouseleave=${this._onContentMouseLeave} part="drop">
          <slot name="drop"></slot>
        </div>
      </div>
    `;
  }
}
