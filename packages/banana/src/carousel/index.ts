/* eslint-disable lit-a11y/click-events-have-key-events */
import { CSSResultGroup, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, query, queryAssignedElements, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { EVENTS, EventType } from './events';
import styles from './index.styles';
import { getCoordinates } from './utils';

@customElement('b-carousel')
export default class BCarousel extends LitElement {
  connectedCallback() {
    super.connectedCallback();

    window.addEventListener('resize', this._windowResizeHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    window.removeEventListener('resize', this._windowResizeHandler);
    this._removeEvents();
    clearTimeout(this.autoplayTimer);
  }

  private _windowResizeHandler = () => {
    this.requestUpdate();
    this._calcPosition();
    this._resetAutoplayTimer();
  };

  private _setAutoplayTimer = () => {
    if (this.autoplay) {
      this._clearAutoplayTimer();
      this.autoplayTimer = setInterval(() => this.next(), this.autoplayDelay);
    }
  };

  private _clearAutoplayTimer = () => {
    clearInterval(this.autoplayTimer);
  };

  private _resetAutoplayTimer = () => {
    this._clearAutoplayTimer();
    this._setAutoplayTimer();
  };

  protected firstUpdated(): void {
    this._calcPosition();
  }

  protected willUpdate(_changedProperties: PropertyValueMap<this>): void {
    if (_changedProperties.has('autoplay') || _changedProperties.has('autoplayDelay')) {
      this._resetAutoplayTimer();
    }

    if (
      _changedProperties.has('currentIndex') ||
      _changedProperties.has('gap') ||
      _changedProperties.has('slidesPerView')
    ) {
      this._calcPosition();
    }

    if (_changedProperties.has('currentIndex') && this.autoHeight) {
      this.calcHeight();
    }
  }

  protected updated(_changedProperties: PropertyValueMap<this>): void {
    if (_changedProperties.has('currentIndex')) {
      this.dispatchEvent(new CustomEvent('change', { detail: { currentIndex: this.currentIndex } }));
    }
  }

  static styles?: CSSResultGroup = styles;

  // When the count of slides is less than (this._slidesPerView + 1), loop property will be ignored.
  // For example, if this._slidesPerView is set to 5, then there are at least 7 slides to enable the loop mode.
  // Do not use this property directly, use internal _loop instead.
  @property({ type: Boolean, reflect: true })
  loop = false;

  private get _loop() {
    return this._slides.length > this._slidesPerView + 1 ? this.loop : false;
  }

  // Do not use this property directly, use internal _slidesPerView instead.
  @property({ type: Number, reflect: true, attribute: 'slides-per-view' })
  slidesPerView = 1;

  private get _slidesPerView() {
    return this._slides.length >= this.slidesPerView || this.disableFill ? this.slidesPerView : this._slides.length;
  }

  @property({ type: Boolean, reflect: true })
  autoplay = false;

  // Unit: ms
  @property({ type: Number, reflect: true, attribute: 'autoplay-delay' })
  autoplayDelay = 3000;

  @property({ type: Boolean, reflect: true, attribute: 'pause-on-mouse-enter' })
  pauseOnMouseEnter = true;

  @property({ type: Boolean, reflect: true, attribute: 'disable-drag' })
  disableDrag = false;

  @property({ type: Boolean, reflect: true })
  navigation = false;

  @property({ type: Number, reflect: true })
  gap = 0;

  // By default, carousel will be filled when the slide count is less than the `slidesPerView` property.
  @property({ type: Boolean, reflect: true, attribute: 'disable-fill' })
  disableFill = false;

  @property({ type: Boolean, reflect: true, attribute: 'auto-height' })
  autoHeight = false;

  @property({ type: Boolean, reflect: true })
  indicator = false;

  @query('.external-wrapper')
  _externalWrapper: HTMLDivElement | undefined;

  @query('.slides-wrapper')
  _slidesWrapper: HTMLDivElement | undefined;

  @queryAssignedElements({})
  _slidesWithCopys!: Array<HTMLElement>;

  @queryAssignedElements({ selector: ':not([data-clone])' })
  _slides!: Array<HTMLElement>;

  @state()
  currentIndex = 0;

  @state()
  _dragDistance = 0;

  @state()
  _isDragging = false;

  @state()
  autoplayTimer: ReturnType<typeof setInterval> | undefined;

  private get _externalWrapperWidth() {
    return this._externalWrapper?.getBoundingClientRect().width || 0;
  }

  private get _slideWidth() {
    return (this._externalWrapperWidth - (this._slidesPerView - 1) * this.gap) / this._slidesPerView;
  }

  private get MIN() {
    return 0;
  }

  private get MAX() {
    return this._slides.length - 1;
  }

  private get totalWidth() {
    return this._slideWidth * this._slides.length + this._slides.length * this.gap;
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
    } else if (this._loop) {
      target = this.MAX;
    }

    return target;
  }

  private _computeNext(index: number) {
    let target = index;

    if (index + 1 <= this.MAX - this._slidesPerView + 1) {
      target = index + 1;
    } else if (this._loop) {
      target = index + 1 <= this.MAX ? index + 1 : this.MIN;
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
    if (this.disableDrag) return;

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

  private _listenEvents() {
    window.addEventListener(EVENTS.MOUSEMOVE, this._eventHandler);
    window.addEventListener(EVENTS.TOUCHMOVE, this._eventHandler);
    window.addEventListener(EVENTS.MOUSEUP, this._eventHandler);
    window.addEventListener(EVENTS.TOUCHEND, this._eventHandler);
    window.addEventListener(EVENTS.TOUCHCANCEL, this._eventHandler);
  }

  private _removeEvents() {
    window.removeEventListener(EVENTS.MOUSEMOVE, this._eventHandler);
    window.removeEventListener(EVENTS.TOUCHMOVE, this._eventHandler);
    window.removeEventListener(EVENTS.MOUSEUP, this._eventHandler);
    window.removeEventListener(EVENTS.TOUCHEND, this._eventHandler);
    window.removeEventListener(EVENTS.TOUCHCANCEL, this._eventHandler);
  }

  public calcHeight() {
    // _externalWrapper is not ready when the component is first rendered.
    if (!this.autoHeight || !this._externalWrapper) return;

    const currentSlide = this._slides[this.currentIndex];
    if (!currentSlide) return;

    const currentSlideHeight = currentSlide.getBoundingClientRect().height;
    if (currentSlideHeight === 0) return;
    this._externalWrapper.style.height = `${currentSlideHeight}px`;
  }

  private _calcPosition() {
    this._repositioningSlides();
    this._refreshCopys();
  }

  private _repositioningSlides() {
    if (this._loop) {
      const translateValue = this._loopCount * this.totalWidth;

      for (const slide of this._slides) {
        slide.style.transform = `translate3d(${translateValue}px, 0, 0)`;
      }
    }
  }

  private _refreshCopys() {
    if (this._loop) {
      // clear copys before calc
      if (!this._slidesWrapper) return;
      for (const ele of this._slidesWithCopys) {
        if (ele.hasAttribute('data-clone')) {
          ele.remove();
        }
      }

      const slideWidthWithGap = this._slideWidth + this.gap;
      const translateValue = this._loopCount * this.totalWidth - slideWidthWithGap * this._slidesPerView || 0;
      const _translateValue = (this._loopCount - 1) * this.totalWidth - slideWidthWithGap * this._slidesPerView || 0;

      // Those copys will append to the beginning of slides.
      const CopysAtTheBeginning = [];
      for (let i = 0; i < this._slidesPerView; i++) {
        CopysAtTheBeginning.push(
          this._slides[this._slides.length - this._slidesPerView + i].cloneNode(true) as HTMLElement,
        );
      }

      // Those copys will append to the end of slides.
      const CopysAtTheEnd = [];
      for (let i = 0; i < this._slidesPerView; i++) {
        CopysAtTheEnd.push(this._slides[i].cloneNode(true) as HTMLElement);
      }

      // append copys
      for (let i = 0; i < this._slidesPerView; i++) {
        const copyAtTheBeginning = CopysAtTheBeginning[i];
        copyAtTheBeginning.setAttribute('data-clone', String(this._slides.length - this._slidesPerView + i));
        copyAtTheBeginning.style.transform = `translate3d(${_translateValue}px, 0, 0)`;
        this.append(copyAtTheBeginning);
      }
      for (let i = 0; i < this._slidesPerView; i++) {
        const copyAtTheEnd = CopysAtTheEnd[i];
        copyAtTheEnd.setAttribute('data-clone', String(i));
        copyAtTheEnd.style.transform = `translate3d(${translateValue}px, 0, 0)`;
        this.append(copyAtTheEnd);
      }
    }
  }

  private _onDragStart(e: Event) {
    const [x, y] = getCoordinates(e);

    this._isDragging = true;

    this._clearAutoplayTimer();

    this._pointerStartX = this._pointerCurrentX = this._pointerLastX = x;
    this._pointerStartY = this._pointerCurrentY = this._pointerLastY = y;

    this._addTrackingCoordinates(x, y);

    this._listenEvents();
  }

  private _onDragging(e: Event) {
    const [x, y] = getCoordinates(e);

    this._pointerCurrentX = x;
    this._pointerCurrentY = y;

    this._addTrackingCoordinates(x, y);

    // When start dragging, that _pointerStartX obviously won't be undefined.
    // Dragging can only occur after DragStart, and the _onDragStart function will set the _pointerStartX.
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this._dragDistance = this._pointerCurrentX - this._pointerStartX!;
  }

  private _onDragEnd(e: Event) {
    this._isDragging = false;

    const [x, y] = getCoordinates(e);

    this._addTrackingCoordinates(x, y);

    this._setAutoplayTimer();

    const firstTrackingCoordinate = this._trackingCoordinates[0];
    const lastTrackingCoordinate = this._trackingCoordinates[this._trackingCoordinates.length - 1];

    this._trackingCoordinates = [];

    const diffX = lastTrackingCoordinate.x - firstTrackingCoordinate.x;
    // const diffY = lastTrackingCoordinate.y - firstTrackingCoordinate.y;
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

      if (distanceOfCurrentSlidesToWrapper < 0 && -distanceOfCurrentSlidesToWrapper > this._slideWidth / 2) {
        this.next();
      } else if (distanceOfCurrentSlidesToWrapper > 0 && distanceOfCurrentSlidesToWrapper > this._slideWidth / 2) {
        this.prev();
      }
    }

    this._removeEvents();
  }

  public goto(index: number) {
    this._resetAutoplayTimer();
    this.currentIndex = index;
  }

  public next() {
    this._resetAutoplayTimer();

    // It means a loop has been finished.
    if (this._loop && this.currentIndex > this._computeNext(this.currentIndex)) {
      this._loopCount += 1;
    }
    this.currentIndex = this._computeNext(this.currentIndex);
  }

  public prev() {
    this._resetAutoplayTimer();

    // It means a loop has been finished.
    if (this._loop && this.currentIndex < this._computePrev(this.currentIndex)) {
      this._loopCount -= 1;
    }
    this.currentIndex = this._computePrev(this.currentIndex);
  }

  private _externalWrapperTranslate() {
    const wholeWidth = this._slideWidth + this.gap;

    if (this._loop) {
      const loopShift = -(this.totalWidth * this._loopCount);
      return -this.currentIndex * wholeWidth + this._dragDistance + loopShift;
    } else {
      return -this.currentIndex * wholeWidth + this._dragDistance;
    }
  }

  private _onWrapperMouseEnter() {
    if (this.pauseOnMouseEnter) {
      this._clearAutoplayTimer();
    }
  }

  private _onWrapperMouseLeave() {
    if (this.pauseOnMouseEnter) {
      this._setAutoplayTimer();
    }
  }

  private async _handleSlotChange() {
    this.requestUpdate();
    await this.updateComplete;
    this.calcHeight();
  }

  render() {
    const previousNavigationDisabled = this._computePrev(this.currentIndex) === this.currentIndex;
    const nextNavigationDisabled = this._computeNext(this.currentIndex) === this.currentIndex;

    return html`
      <div
        part="base"
        class=${classMap({
          carousel: true,
        })}
      >
        <div
          part="external-wrapper"
          class="external-wrapper"
          @mouseenter=${this._onWrapperMouseEnter}
          @mouseleave=${this._onWrapperMouseLeave}
        >
          <div
            part="slides-wrapper"
            @mousedown="${this._eventHandler}"
            @touchstart="${this._eventHandler}"
            class=${classMap({
              'slides-wrapper': true,
              'no-transition': this._isDragging,
            })}
            style="transform: translate3d(${this._externalWrapperTranslate()}px, 0px, 0px); --banana-carousel-slidesPerView: ${this
              ._slidesPerView}; --banana-carousel-gap: ${this.gap}"
          >
            <slot part="slide" @slotchange=${this._handleSlotChange}></slot>
          </div>
        </div>

        <ul part="indicators" class="indicators" ?hidden=${!this.indicator}>
          ${this._slides.map(
            (_, index) => html`
              <li
                part="indicator${index === this.currentIndex ? ' indicator--active' : ''}"
                class=${classMap({
                  indicator: true,
                  active: index === this.currentIndex,
                })}
                @click=${() => {
                  this.goto(index);
                }}
              ></li>
            `,
          )}
        </ul>

        <button
          @click=${this.prev}
          part="navigation-buttons navigation-button--previous ${previousNavigationDisabled
            ? 'navigation-buttons--disabled'
            : ''}"
          class=${classMap({
            'navigation-buttons': true,
            'navigation-button--previous': true,
            'navigation-button--disabled': previousNavigationDisabled,
          })}
          ?hidden=${!this.navigation}
          ?disabled=${previousNavigationDisabled}
        >
          <slot name="prev-button">
            <div class="default-prev-icon">
              <svg
                t="1685007670520"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="993"
                width="24"
                height="24"
              >
                <path
                  d="M384 512L731.733333 202.666667c17.066667-14.933333 19.2-42.666667 4.266667-59.733334-14.933333-17.066667-42.666667-19.2-59.733333-4.266666l-384 341.333333c-10.666667 8.533333-14.933333 19.2-14.933334 32s4.266667 23.466667 14.933334 32l384 341.333333c8.533333 6.4 19.2 10.666667 27.733333 10.666667 12.8 0 23.466667-4.266667 32-14.933333 14.933333-17.066667 14.933333-44.8-4.266667-59.733334L384 512z"
                  fill="#333"
                  p-id="994"
                ></path>
              </svg>
            </div>
          </slot>
        </button>
        <button
          @click=${this.next}
          part="navigation-buttons navigation-button--next ${nextNavigationDisabled
            ? 'navigation-buttons--disabled'
            : ''}"
          class=${classMap({
            'navigation-buttons': true,
            'navigation-button--next': true,
            'navigation-button--disabled': nextNavigationDisabled,
          })}
          ?hidden=${!this.navigation}
          ?disabled=${nextNavigationDisabled}
        >
          <slot name="next-button">
            <div class="default-next-icon">
              <svg
                t="1685007929073"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1147"
                width="24"
                height="24"
              >
                <path
                  d="M731.733333 480l-384-341.333333c-17.066667-14.933333-44.8-14.933333-59.733333 4.266666-14.933333 17.066667-14.933333 44.8 4.266667 59.733334L640 512 292.266667 821.333333c-17.066667 14.933333-19.2 42.666667-4.266667 59.733334 8.533333 8.533333 19.2 14.933333 32 14.933333 10.666667 0 19.2-4.266667 27.733333-10.666667l384-341.333333c8.533333-8.533333 14.933333-19.2 14.933334-32s-4.266667-23.466667-14.933334-32z"
                  fill="#333"
                  p-id="1148"
                ></path>
              </svg>
            </div>
          </slot>
        </button>
      </div>
    `;
  }
}
