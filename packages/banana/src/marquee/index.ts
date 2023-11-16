import { CSSResultGroup, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import styles from './index.styles';

@customElement('b-marquee')
export default class BMarquee extends LitElement {
  static styles?: CSSResultGroup = styles;

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
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
    return html`
      <div
        part="base"
        class=${classMap({
          marquee: true,
          'marquee--pause-when-hover': this.pauseWhenHover,
        })}
      >
        <div part="content" class="content">${this.content}</div>
      </div>
    `;
  }
}
