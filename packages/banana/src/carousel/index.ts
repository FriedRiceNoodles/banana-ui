import { CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property, query, queryAssignedElements, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { EVENTS, EventType } from './events';
import styles from './index.styles';
import { getCoordinates } from './utils';

@customElement('b-carousel')
export default class BCarousel extends LitElement {
  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  static styles?: CSSResultGroup = styles;

  @property({ attribute: false })
  currentIndex = 0;

  @property({ type: Boolean })
  loop = false;

  @query('.external-wrapper')
  _externalWrapper: HTMLDivElement | undefined;

  @queryAssignedElements({})
  _slides!: Array<HTMLElement>;

  @state()
  _dragDistance = 0;

  @state()
  _isDragging = false;

  private get _externalWrapperWidth() {
    return this._externalWrapper?.getBoundingClientRect().width || 0;
  }

  private get MIN() {
    return 0;
  }

  private get MAX() {
    return this._slides.length - 1;
  }

  private get totalWidth() {
    return this._externalWrapperWidth * this._slides.length;
  }

  // Record how many cycles have been made if `loop` is true.
  // It can be a negative number.
  private _loopCount = 0;

  // Minimum speed for moving slide. Unit: px per ms
  private _minSpeedToMoveX = 0.1;
  private _minSpeedToMoveY = 0.1;

  // The coordinates where the user starts dragging.
  private _pointerStartX: number | undefined;
  private _pointerStartY: number | undefined;

  // The coordinates where the user is dragging.
  private _pointerCurrentX: number | undefined;
  private _pointerCurrentY: number | undefined;

  // The coordinates where the user has finished dragging.
  private _pointerLastX: number | undefined;
  private _pointerLastY: number | undefined;

  // Store the coordinates when dragging.
  private _trackingCoordinates: { x: number; y: number; time: number }[] = [];

  private _computePrev(index: number) {
    let target = index;

    if (index - 1 >= this.MIN) {
      target = index - 1;
    } else if (this.loop) {
      target = this.MAX;
    }

    return target;
  }

  private _computeNext(index: number) {
    let target = index;

    if (index + 1 <= this.MAX) {
      target = index + 1;
    } else if (this.loop) {
      target = this.MIN;
    }

    return target;
  }

  // The time interval between tracking coordinates should be less than 100ms.
  private _addTrackingCoordinates(x: number, y: number) {
    const time = Date.now();
    while (this._trackingCoordinates.length > 0) {
      if (time - this._trackingCoordinates[0].time >= 100) {
        this._trackingCoordinates.shift();
      } else {
        break;
      }
    }

    this._trackingCoordinates.push({ x, y, time });
  }

  // Use arrow function to bind 'this' on BCarousel class.
  private _eventHandler = (e: Event) => {
    switch (e.type as EventType) {
      case EVENTS.MOUSEDOWN:
      case EVENTS.TOUCHSTART:
        this._onDragStart(e);
        break;

      case EVENTS.MOUSEMOVE:
      case EVENTS.TOUCHMOVE:
        this._onDragging(e);
        break;

      case EVENTS.MOUSEUP:
      case EVENTS.TOUCHEND:
      case EVENTS.TOUCHCANCEL:
        this._onDragEnd(e);
        break;
    }
  };

  private _onDragStart(e: Event) {
    const [x, y] = getCoordinates(e);

    this._isDragging = true;

    this._pointerStartX = this._pointerCurrentX = this._pointerLastX = x;
    this._pointerStartY = this._pointerCurrentY = this._pointerLastY = y;

    this._addTrackingCoordinates(x, y);

    if (this.loop) {
      const prevIndex = this._computePrev(this.currentIndex);
      const nextIndex = this._computeNext(this.currentIndex);

      const prevSlide = this._slides[prevIndex];
      const currentSlide = this._slides[this.currentIndex];
      const nextSlide = this._slides[nextIndex];

      const translateValue = this._loopCount * this.totalWidth || 0;

      currentSlide.style.transform = `translate3d(${translateValue}px, 0, 0)`;

      if (prevIndex > this.currentIndex) {
        const _translateValue = (this._loopCount - 1) * this.totalWidth || 0;
        prevSlide.style.transform = `translate3d(${_translateValue}px, 0, 0)`;
      } else {
        prevSlide.style.transform = `translate3d(${translateValue}px, 0, 0)`;
      }

      if (nextIndex < this.currentIndex) {
        const _translateValue = (this._loopCount + 1) * this.totalWidth || 0;
        nextSlide.style.transform = `translate3d(${_translateValue}px, 0, 0)`;
      } else {
        nextSlide.style.transform = `translate3d(${translateValue}px, 0, 0)`;
      }
    }

    window.addEventListener(EVENTS.MOUSEMOVE, this._eventHandler);
    window.addEventListener(EVENTS.TOUCHMOVE, this._eventHandler);
    window.addEventListener(EVENTS.MOUSEUP, this._eventHandler);
    window.addEventListener(EVENTS.TOUCHEND, this._eventHandler);
    window.addEventListener(EVENTS.TOUCHCANCEL, this._eventHandler);
  }

  private _onDragging(e: Event) {
    const [x, y] = getCoordinates(e);

    this._pointerCurrentX = x;
    this._pointerCurrentY = y;

    this._addTrackingCoordinates(x, y);

    // When start dragging, that _pointerStartX obviously won't be undefined.
    // Dragging can only occur after DragStart, and the _onDragStart function will set the _pointerStartX.
    this._dragDistance = this._pointerCurrentX - this._pointerStartX!;
  }

  private _onDragEnd(e: Event) {
    this._isDragging = false;

    const [x, y] = getCoordinates(e);
    this._addTrackingCoordinates(x, y);

    const firstTrackingCoordinate = this._trackingCoordinates[0];
    const lastTrackingCoordinate = this._trackingCoordinates[this._trackingCoordinates.length - 1];

    this._trackingCoordinates = [];

    const diffX = lastTrackingCoordinate.x - firstTrackingCoordinate.x;
    const diffY = lastTrackingCoordinate.y - firstTrackingCoordinate.y;
    const diffTime = lastTrackingCoordinate.time - firstTrackingCoordinate.time;

    this._dragDistance = 0;

    const speedX = Math.abs(diffX / diffTime);
    if (speedX >= this._minSpeedToMoveX) {
      if (diffX < 0) {
        this.next();
      } else {
        this.prev();
      }
    } else {
      // Move if speed is not enough but dragging more than half.
      const wrapperX = this._externalWrapper?.getBoundingClientRect().x || 0;
      const distanceFromSlidesToWrapper = this._slides.map((item) => item.getBoundingClientRect().x - wrapperX);
      const distanceOfCurrentSlidesToWrapper = distanceFromSlidesToWrapper[this.currentIndex];

      if (distanceOfCurrentSlidesToWrapper < 0 && -distanceOfCurrentSlidesToWrapper > this._externalWrapperWidth / 2) {
        this.next();
      } else if (distanceOfCurrentSlidesToWrapper > 0 && distanceOfCurrentSlidesToWrapper > this._externalWrapperWidth / 2) {
        this.prev();
      }
    }

    window.removeEventListener(EVENTS.MOUSEMOVE, this._eventHandler);
    window.removeEventListener(EVENTS.TOUCHMOVE, this._eventHandler);
    window.removeEventListener(EVENTS.MOUSEUP, this._eventHandler);
    window.removeEventListener(EVENTS.TOUCHEND, this._eventHandler);
    window.removeEventListener(EVENTS.TOUCHCANCEL, this._eventHandler);
  }

  public next() {
    // It means a loop has been finished.
    if (this.loop && this.currentIndex > this._computeNext(this.currentIndex)) {
      this._loopCount += 1;
    }
    this.currentIndex = this._computeNext(this.currentIndex);
  }

  public prev() {
    // It means a loop has been finished.
    if (this.loop && this.currentIndex < this._computePrev(this.currentIndex)) {
      this._loopCount -= 1;
    }
    this.currentIndex = this._computePrev(this.currentIndex);
  }

  private _externalWrapperTranslate() {
    if (this.loop) {
      const loopShift = -(this.totalWidth * this._loopCount);
      return -this.currentIndex * this._externalWrapperWidth + this._dragDistance + loopShift;
    } else {
      return -this.currentIndex * this._externalWrapperWidth + this._dragDistance;
    }
  }

  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          carousel: true,
        })}
      >
        <div class="external-wrapper">
          <div
            part="slides-wrapper"
            @mousedown="${this._eventHandler}"
            @touchstart="${this._eventHandler}"
            class=${classMap({
              'slides-wrapper': true,
              'no-transition': this._isDragging,
            })}
            style="transform: translate3d(${this._externalWrapperTranslate()}px, 0px, 0px);"
          >
            <slot part="slide"></slot>
          </div>
        </div>
      </div>
    `;
  }
}
