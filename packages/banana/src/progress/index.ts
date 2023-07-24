import { CSSResultGroup, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './index.styles';

@customElement('b-progress')
export default class BProgress extends LitElement {
  static styles?: CSSResultGroup = styles;

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  @property({ reflect: true, type: Number })
  percent: number | undefined;

  @property({ reflect: true })
  color: string | undefined;

  @property({ reflect: true })
  backgroundColor: string | undefined;

  @property({ reflect: true, type: Number })
  height: number | undefined;

  protected willUpdate(_changedProperties: PropertyValueMap<this>): void {
    if (_changedProperties.has('percent')) {
      const percent = this.percent ?? '';
      this.style.setProperty('--banana-progress-percent', `${percent}%`);
    }

    if (_changedProperties.has('color')) {
      const color = this.color ?? '';
      this.style.setProperty('--banana-progress-color', color);
    }

    if (_changedProperties.has('backgroundColor')) {
      const backgroundColor = this.backgroundColor ?? '';
      this.style.setProperty('--banana-progress-background-color', backgroundColor);
    }

    if (_changedProperties.has('height')) {
      const height = this.height ?? '';
      this.style.setProperty('--banana-progress-height', `${height}px`);
    }
  }

  render() {
    return html`
      <div class="progress" part="base">
        <div class="progress-bar"></div>
      </div>
    `;
  }
}
