import { arrow, computePosition, ComputePositionConfig, flip, offset, platform, shift, Side } from '@floating-ui/dom';
import { offsetParent } from 'composed-offset-position';
import { CSSResultGroup, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import styles from './index.styles';

export type Placement =
  | 'bottomLeft'
  | 'bottom'
  | 'bottomRight'
  | 'topLeft'
  | 'top'
  | 'topRight'
  | 'leftTop'
  | 'left'
  | 'leftBottom'
  | 'rightTop'
  | 'right'
  | 'rightBottom';

const placementMap = new Map<Placement, ComputePositionConfig['placement']>([
  ['bottom', 'bottom'],
  ['bottomLeft', 'bottom-start'],
  ['bottomRight', 'bottom-end'],
  ['top', 'top'],
  ['topLeft', 'top-start'],
  ['topRight', 'top-end'],
  ['left', 'left'],
  ['leftTop', 'left-start'],
  ['leftBottom', 'left-end'],
  ['right', 'right'],
  ['rightTop', 'right-start'],
  ['rightBottom', 'right-end'],
]);

@customElement('b-tooltip')
export default class BTooltip extends LitElement {
  static styles?: CSSResultGroup = styles;

  @state()
  open = false;

  private _openTimer: ReturnType<typeof setTimeout> | undefined;

  private _closeTimer: ReturnType<typeof setTimeout> | undefined;

  @property()
  content = '';

  @property({ reflect: true })
  placement: Placement = 'top';

  @property({ type: Boolean, reflect: true, attribute: 'disable-auto-adjust-overflow' })
  disableAutoAdjustOverflow = false;

  @property({ reflect: true, attribute: 'max-width' })
  maxWidth: number | string | undefined;

  @property({ reflect: true, attribute: 'background-color' })
  backgroundColor: string | undefined;

  // The distance from the tooltip content to the trigger.
  @property({ type: Number, reflect: true })
  margin = 8;

  // The time delay before tooltip content appears after mouse enter the trigger. Unit: ms.
  @property({ type: Number, reflect: true, attribute: 'mouse-enter-delay' })
  mouseEnterDelay = 100;

  // The time delay before tooltip content disappears after mouse leave the tooltip content. Unit: ms.
  @property({ type: Number, reflect: true, attribute: 'mouse-leave-delay' })
  mouseLeaveDelay = 100;

  @property({ reflect: true, attribute: 'trigger-action' })
  triggerAction: 'hover' | 'click' = 'hover';

  @property({ type: Boolean, reflect: true, attribute: 'no-arrow' })
  noArrow = false;

  private _trigger: HTMLElement | undefined;

  private _arrow: HTMLElement | undefined;

  @query('.tooltip__trigger')
  _triggerSlot: HTMLSlotElement | undefined;

  @query('.tooltip__arrow-slot')
  _arrowSlot: HTMLSlotElement | undefined;

  @query('.tooltip__default-arrow')
  _defaultArrow: HTMLElement | undefined;

  @query('.tooltip__content')
  _content: HTMLElement | undefined;

  private _handleTriggerSlotChange() {
    if (!this._triggerSlot) return;
    this._trigger = this._triggerSlot?.assignedElements()[0] as HTMLElement;
    this._trigger.setAttribute('tabindex', '0');
    this._trigger.addEventListener('focus', this._onTriggerMouseEnter.bind(this));
    this._trigger.addEventListener('blur', this._onTriggerMouseLeave.bind(this));
  }

  private _handleArrowSlotChange() {
    if (!this._arrowSlot) return;
    this._arrow = (this._arrowSlot?.assignedElements()[0] as HTMLElement | undefined) || this._defaultArrow;
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

    const middleware: ComputePositionConfig['middleware'] = [offset(this.margin), shift({ padding: 10 })];
    if (!this.disableAutoAdjustOverflow) middleware.push(flip());
    if (this._arrow !== undefined && !this.noArrow) middleware.push(arrow({ element: this._arrow }));

    void computePosition(this._trigger, this._content, {
      placement: placementMap.get(this.placement),
      middleware: middleware,
      platform: {
        ...platform,
        // https://floating-ui.com/docs/platform#getoffsetparent
        getOffsetParent: (element) => platform.getOffsetParent(element, offsetParent),
      },
    }).then(({ x, y, middlewareData, placement }) => {
      Object.assign((this._content as HTMLElement).style, {
        left: `${x}px`,
        top: `${y}px`,
      });

      if (this._arrow !== undefined) {
        const side = placement.split('-')[0] as Side;
        const staticSide = {
          top: 'bottom',
          right: 'left',
          bottom: 'top',
          left: 'right',
        }[side];

        const arrowX = middlewareData.arrow?.x ?? '';
        const arrowY = middlewareData.arrow?.y ?? '';

        Object.assign(this._arrow.style, {
          left: `${arrowX}px`,
          top: `${arrowY}px`,
          [staticSide]: `${-this._arrow.offsetWidth / 2}px`,
          [side]: 'auto',
        });
      }
    });
  }

  private _open() {
    if ((this.content?.length || 0) === 0) return;
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

  private _onTriggerKeyDown(event: KeyboardEvent) {
    if (this.triggerAction !== 'click') return;

    // If the dropdown is open, press the `Esc` key or `Space` key to close the dropdown.
    if (this.open && (event.key === 'Escape' || event.key === ' ')) {
      event.preventDefault();
      this._close();
      return;
    }

    // If the dropdown is closed, press the `Enter` key or `Space` key to open the dropdown.
    if (!this.open && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      this._open();
      return;
    }
  }

  private _onTriggerClick() {
    if (this.triggerAction !== 'click') return;

    if (this.open) {
      this._close();
    } else {
      this._open();
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
    if (!this._content) return;

    // Pass an `open` attribute directly is not allowed.
    this.open = false;
    this._content.hidden = true;

    // If the arrow slot is not provided, set the default arrow.
    if (this._arrowSlot?.assignedElements()[0] === undefined) {
      this._arrow = this._defaultArrow;
    }
  }

  protected willUpdate(changedProperties: PropertyValueMap<this>): void {
    if (changedProperties.has('maxWidth')) {
      const width = this.maxWidth !== undefined ? String(this.maxWidth) : '';
      const _regExp = /^\d+$/;
      this.style.setProperty('--banana-tooltip-max-width', _regExp.test(width) ? `${width}px` : width);
    }

    if (changedProperties.has('backgroundColor')) {
      const backgroundColor = this.backgroundColor ?? '';
      this.style.setProperty('--banana-tooltip-background-color', backgroundColor);
    }

    if (changedProperties.has('open')) {
      if (!this._trigger || !this._content) return;
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
          @click=${this._onTriggerClick}
          @keydown=${this._onTriggerKeyDown}
        ></slot>
        <div
          class="tooltip__content"
          part="drop"
          @mouseenter=${this._onContentMouseEnter}
          @mouseleave=${this._onContentMouseLeave}
          ?hidden=${(this.content?.length || 0) === 0}
        >
          <slot name="content">
            <div part="content" class="tooltip__content-body">${this.content}</div>
          </slot>
          <slot
            class="tooltip__arrow-slot"
            name="arrow"
            @slotchange=${this._handleArrowSlotChange}
            ?hidden=${this.noArrow}
          >
            <span part="arrow" class="tooltip__default-arrow"></span>
          </slot>
        </div>
      </div>
    `;
  }
}
