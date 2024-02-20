import { arrow, computePosition, ComputePositionConfig, flip, offset, Side } from '@floating-ui/dom';
import { CSSResultGroup, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, query, queryAssignedElements, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
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
    document.removeEventListener('click', this._onDocumentClick);
  }

  static styles: CSSResultGroup = styles;

  private _trigger: HTMLElement | undefined;

  @query('.dropdown__trigger')
  _triggerSlot: HTMLSlotElement | undefined;

  @query('.dropdown__content')
  _content: HTMLElement | undefined;

  @queryAssignedElements({ slot: 'arrow' })
  _arrowElements!: Array<HTMLElement>;

  // The distance from the dropdown content to the trigger.
  @property({ type: Number, reflect: true })
  margin = 4;

  // The time delay before dropdown content appears after mouse enter the trigger. Unit: ms.
  @property({ type: Number, reflect: true, attribute: 'mouse-enter-delay' })
  mouseEnterDelay = 100;

  // The time delay before dropdown content disappears after mouse leave the dropdown content. Unit: ms.
  @property({ type: Number, reflect: true, attribute: 'mouse-leave-delay' })
  mouseLeaveDelay = 100;

  @property({ reflect: true })
  placement: Placement = 'bottomLeft';

  @property({ type: Boolean, reflect: true, attribute: 'no-auto-adjust-overflow' })
  noAutoAdjustOverflow = false;

  @property({ reflect: true, attribute: 'trigger-action' })
  triggerAction: 'hover' | 'click' = 'hover';

  @state()
  open = false;

  private _openTimer: ReturnType<typeof setTimeout> | undefined;

  private _closeTimer: ReturnType<typeof setTimeout> | undefined;

  private _repositioning() {
    if (!this._trigger || !this._content) return;

    const middleware: ComputePositionConfig['middleware'] = [offset(this.margin)];
    if (!this.noAutoAdjustOverflow) middleware.push(flip());
    if (this._arrowElements[0] !== undefined) middleware.push(arrow({ element: this._arrowElements[0] }));

    void computePosition(this._trigger, this._content, {
      placement: placementMap.get(this.placement),
      middleware: middleware,
    }).then(({ x, y, middlewareData, placement }) => {
      Object.assign((this._content as HTMLElement).style, {
        left: `${x}px`,
        top: `${y}px`,
      });

      if (this._arrowElements[0] !== undefined) {
        const side = placement.split('-')[0] as Side;
        const staticSide = {
          top: 'bottom',
          right: 'left',
          bottom: 'top',
          left: 'right',
        }[side];

        const arrowX = middlewareData.arrow?.x ?? '';
        const arrowY = middlewareData.arrow?.y ?? '';

        Object.assign(this._arrowElements[0].style, {
          left: `${arrowX}px`,
          top: `${arrowY}px`,
          [staticSide]: `${-this._arrowElements[0].offsetWidth / 2}px`,
          [side]: 'auto',
          transform: 'rotate(45deg)',
        });
      }
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

  private _handleTriggerSlotChange() {
    if (!this._triggerSlot) return;
    this._trigger = this._triggerSlot?.assignedElements()[0] as HTMLElement;
    this._trigger.setAttribute('tabindex', '0');
  }

  protected firstUpdated(): void {
    if (!this._content) return;

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
        })}
        part="base"
      >
        <slot
          class="dropdown__trigger"
          @click=${this._onTriggerClick}
          @keydown=${this._onTriggerKeyDown}
          @mouseenter=${this._onTriggerMouseEnter}
          @mouseleave=${this._onTriggerMouseLeave}
          part="trigger"
          @slotchange=${this._handleTriggerSlotChange}
        ></slot>
        <div
          class="dropdown__content"
          @mouseenter=${this._onContentMouseEnter}
          @mouseleave=${this._onContentMouseLeave}
          part="drop"
        >
          <slot name="drop"></slot>
          <slot name="arrow" ?hidden=${this._arrowElements[0] === undefined} class="arrowSlot"></slot>
        </div>
      </div>
    `;
  }
}
