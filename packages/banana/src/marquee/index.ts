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
    // 停止观察元素的尺寸变化
    this._marquee && this.resizeObserver?.unobserve(this._marquee);
    this._mainContent && this.resizeObserver?.unobserve(this._mainContent);
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

  @property({ type: Boolean })
  fixed = false;

  private _animationPlayState: 'running' | 'paused' = 'running';

  @query('.marquee')
  _marquee: HTMLDivElement | undefined;

  @query('#main-content')
  _mainContent: HTMLDivElement | undefined;

  firstUpdated() {
    // 观察元素的尺寸变化
    if (this._marquee && this._mainContent && this.fixed) {
      this.resizeObserver = new ResizeObserver(() => this._calculateWidth());

      this.resizeObserver?.observe(this._marquee);
      this.resizeObserver?.observe(this._mainContent);
    }
  }

  private _calculateWidth() {
    if (this._marquee && this._mainContent && this.fixed) {
      const marqueeWidth = this._marquee.getBoundingClientRect().width;
      const contentWidth = this._mainContent.getBoundingClientRect().width;

      if (contentWidth > marqueeWidth) {
        this._animationPlayState = 'running';
        this._setStyleFixed();
      } else {
        if (this._animationPlayState === 'running') {
          // 暂停的时候等上一次的动画是否结束 结束后才暂停 这样比较友好
          this._animationPlayState = 'paused';
          this._mainContent.addEventListener('animationiteration', this._setStyleFixed.bind(this), { once: true });
        }
      }
    }
  }

  private _setStyleFixed() {
    this.style.setProperty('--banana-marquee-fixed', this._animationPlayState);
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

    if (_changedProperties.has('fixed')) {
      const fixed = this.fixed;
      this._animationPlayState = fixed ? 'paused' : 'running';
      this._setStyleFixed();
    }
  }

  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          marquee: true,
          'marquee--pause-when-hover': this.pauseWhenHover,
        })}
      >
        <div id="main-content" part="content" class="content">${this.content}</div>
        <div part="content" class="content">${this.content}</div>
      </div>
    `;
  }
}
