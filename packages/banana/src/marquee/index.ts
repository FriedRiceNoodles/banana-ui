import { CSSResultGroup, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
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
    // 停止观察元素的尺寸变化
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

  // 判断是否是 normal还是fixed (fixed为true时，才生效)
  @state()
  _isNormal = true;

  @query('.marquee')
  _marquee: HTMLDivElement | undefined;

  @query('.content')
  _content: HTMLDivElement | undefined;

  firstUpdated() {
    this._setBananaMarqueeWidth();

    // 观察元素的尺寸变化
    if (this._marquee) {
      this.resizeObserver = new ResizeObserver(() => this._calculateWidth());

      this.resizeObserver?.observe(this._marquee);
    }
  }

  private _calculateWidth() {
    // marquee的宽度变化了 重新设置marquee的宽度
    this._setBananaMarqueeWidth();

    if (this._marquee && this._content && this.fixed) {
      const marqueeWidth = this._marquee.getBoundingClientRect().width;
      const contentWidth = this._content.getBoundingClientRect().width;

      this._isNormal = contentWidth > marqueeWidth;
    }
  }

  private _setBananaMarqueeWidth() {
    this.style.setProperty('--banana-marquee-width', `${this._marquee!.getBoundingClientRect().width}px`);
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
    const marqueeClass = classMap({
      marquee: true,
      'marquee--pause-when-hover': this.pauseWhenHover,
    });

    const contentClass = classMap({
      content: true,
      'content-normal': this._isNormal,
      'content-fixed': !this._isNormal,
    });

    return html`
      <div part="base" class=${marqueeClass}>
        <div part="content" class=${contentClass}>${this.content}</div>
      </div>
    `;
  }
}
