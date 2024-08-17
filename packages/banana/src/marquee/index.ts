import { CSSResultGroup, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import styles from './index.styles';

@customElement('b-marquee')
export default class BMarquee extends LitElement {
  static styles?: CSSResultGroup = styles;
  private resizeObserver: ResizeObserver | undefined;

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._marquee && this.resizeObserver?.unobserve(this._marquee);
  }

  @property()
  content = '';

  @property()
  color: string | undefined;

  // Duration of the animation in seconds
  @property({ type: Number })
  duration = 20;

  @property({ type: Boolean, attribute: 'pause-when-hover' })
  pauseWhenHover = false;

  @property({ type: Boolean, reflect: true })
  fixed = false;

  @query('.marquee')
  _marquee: HTMLDivElement | undefined;

  @query('.content')
  _content: HTMLDivElement | undefined;

  firstUpdated() {
    this._setBananaMarqueeWidth();

    if (this._marquee) {
      this.resizeObserver = new ResizeObserver(() => this._setBananaMarqueeWidth());

      this.resizeObserver?.observe(this._marquee);
    }
  }

  private _setBananaMarqueeWidth() {
    if (!this._marquee) return;
    // Width of the marquee element(not the content)
    // This is used to calculate the animation transform
    this.style.setProperty('--banana-marquee-width', `${this._marquee.getBoundingClientRect().width}px`);
    this.requestUpdate();
  }

  protected willUpdate(_changedProperties: PropertyValueMap<this>): void {
    if (_changedProperties.has('color')) {
      const color = this.color ?? '';
      this.style.setProperty('--banana-marquee-color', color);
    }

    if (_changedProperties.has('duration')) {
      const duration = this.duration;
      this.style.setProperty('--banana-marquee-duration', `${duration}s`);
    }
  }

  render() {
    const marqueeWidth = this._marquee?.getBoundingClientRect().width ?? 0;
    const contentWidth = this._content?.getBoundingClientRect().width ?? 0;
    const shouldBeFixed = !!(this._marquee && this._content && contentWidth < marqueeWidth && this.fixed);

    const marqueeClass = classMap({
      marquee: true,
      'marquee--pause-when-hover': this.pauseWhenHover,
    });

    const contentClass = classMap({
      content: true,
      'content-normal': !shouldBeFixed,
      'content-fixed': shouldBeFixed,
    });

    return html`
      <div part="base" class=${marqueeClass}>
        <div part="content" class=${contentClass}>${this.content}</div>
      </div>
    `;
  }
}
