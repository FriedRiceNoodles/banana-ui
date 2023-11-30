import { computePosition, ComputePositionConfig, offset } from '@floating-ui/dom';
import { CSSResultGroup, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import styles from './index.styles';

@customElement('b-tooltip')
export default class BTooltip extends LitElement {
  static styles?: CSSResultGroup = styles;

  @state()
  open = false;

  private _openTimer: ReturnType<typeof setTimeout> | undefined;

  private _closeTimer: ReturnType<typeof setTimeout> | undefined;

  @property()
  content = '';

  // The distance from the tooltip content to the trigger.
  @property({ type: Number, reflect: true })
  margin = 4;

  // The time delay before tooltip content appears after mouse enter the trigger. Unit: ms.
  @property({ type: Number, reflect: true })
  mouseEnterDelay = 100;

  @property({ reflect: true })
  triggerAction: 'hover' | 'click' = 'hover';

  // The time delay before tooltip content disappears after mouse leave the tooltip content. Unit: ms.
  @property({ type: Number, reflect: true })
  mouseLeaveDelay = 100;

  private _trigger: HTMLElement | undefined;

  @query('.tooltip__trigger')
  _triggerSlot: HTMLSlotElement | undefined;

  @query('.tooltip__content')
  _content: HTMLElement | undefined;

  private _handleTriggerSlotChange() {
    if (!this._triggerSlot) return;
    this._trigger = this._triggerSlot?.assignedElements()[0] as HTMLElement;
    this._trigger.setAttribute('tabindex', '0');
  }

  private _onTriggerMouseEnter() {
    if (this.triggerAction !== 'hover') return;

    if (this.open) {
      clearTimeout(this._closeTimer);
    } else {
      this._openTimer = setTimeout(() => {
        this._open();
      }, this.mouseEnterDelay);
    }
  }

  private _onTriggerMouseLeave() {
    if (this.triggerAction !== 'hover') return;

    if (this.open) {
      this._closeTimer = setTimeout(() => {
        this._close();
      }, this.mouseLeaveDelay);
    } else {
      clearTimeout(this._openTimer);
    }
  }

  private _onContentMouseEnter() {
    clearTimeout(this._closeTimer);
  }

  private _onContentMouseLeave() {
    if (this.triggerAction !== 'hover') return;

    this._closeTimer = setTimeout(() => {
      this._close();
    }, this.mouseLeaveDelay);
  }

  private _repositioning() {
    if (!this._trigger || !this._content) return;

    const middleware: ComputePositionConfig['middleware'] = [offset(this.margin)];
    // if (this.autoAdjustOverflow) middleware.push(flip());
    // if (this._arrowElements[0] !== undefined) middleware.push(arrow({ element: this._arrowElements[0] }));

    void computePosition(this._trigger, this._content, {
      // placement: placementMap.get(this.placement),
      placement: 'top',
      middleware: middleware,
    }).then(({ x, y, middlewareData, placement }) => {
      Object.assign((this._content as HTMLElement).style, {
        left: `${x}px`,
        top: `${y}px`,
      });

      // if (this._arrowElements[0] !== undefined) {
      //   const side = placement.split('-')[0] as Side;
      //   const staticSide = {
      //     top: 'bottom',
      //     right: 'left',
      //     bottom: 'top',
      //     left: 'right',
      //   }[side];

      //   const arrowX = middlewareData.arrow?.x ?? '';
      //   const arrowY = middlewareData.arrow?.y ?? '';

      //   Object.assign(this._arrowElements[0].style, {
      //     left: `${arrowX}px`,
      //     top: `${arrowY}px`,
      //     [staticSide]: `${-this._arrowElements[0].offsetWidth / 2}px`,
      //     [side]: 'auto',
      //     transform: 'rotate(45deg)',
      //   });
      // }
    });
  }

  private _open() {
    this.open = true;
    this._repositioning();

    if (this.triggerAction === 'click') {
      // Listen click event on document to close dropdown.
      document.addEventListener('click', this._onDocumentClick);
    }
  }

  private _close() {
    this.open = false;

    if (this.triggerAction === 'hover') {
      clearTimeout(this._openTimer);
      clearTimeout(this._closeTimer);
    }

    if (this.triggerAction === 'click') {
      document.removeEventListener('click', this._onDocumentClick);
    }
  }

  private _onDocumentClick = (event: MouseEvent) => {
    if (!this._trigger || !this._content) return;

    // If the click event is triggered by the trigger or the content, do nothing.
    const path = event.composedPath();
    if (path.includes(this._trigger) || path.includes(this._content)) return;

    this._close();
  };

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

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this._openTimer);
    clearTimeout(this._closeTimer);
    document.removeEventListener('click', this._onDocumentClick);
  }

  render() {
    return html`
      <div
        class=${classMap({
          tooltip: true,
          'tooltip--open': this.open,
        })}
        part="base"
      >
        <slot
          @slotchange=${this._handleTriggerSlotChange}
          class="tooltip__trigger"
          @mouseenter=${this._onTriggerMouseEnter}
          @mouseleave=${this._onTriggerMouseLeave}
        ></slot>
        <div
          class="tooltip__content"
          part="drop"
          @mouseenter=${this._onContentMouseEnter}
          @mouseleave=${this._onContentMouseLeave}
        >
          <slot name="content">
            <div part="content" class="tooltip__content-body">${this.content}</div>
          </slot>
        </div>
      </div>
    `;
  }
}
