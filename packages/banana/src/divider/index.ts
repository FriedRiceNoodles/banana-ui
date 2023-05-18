import { CSSResultGroup, LitElement, PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './index.styles';

@customElement('b-divider')
export default class BDivider extends LitElement {
  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  @property({ reflect: true })
  width: number | string | undefined;

  @property({ reflect: true })
  spacing: number | string | undefined;

  @property({ reflect: true })
  color: string | undefined;

  @property({ reflect: true, type: Boolean })
  vertical = false;

  @property({ reflect: true, type: Boolean })
  dashed = false;

  static styles: CSSResultGroup = styles;

  protected willUpdate(_changedProperties: PropertyValueMap<this>): void {
    if (_changedProperties.has('width')) {
      const width = this.width !== undefined ? String(this.width) : '';
      const _regExp = /^\d+$/;
      this.style.setProperty('--banana-divider-width', _regExp.test(width) ? `${width}px` : width);
    }

    if (_changedProperties.has('spacing')) {
      const spacing = this.spacing !== undefined ? String(this.spacing) : '';
      const _regExp = /^\d+$/;
      this.style.setProperty('--banana-divider-spacing', _regExp.test(spacing) ? `${spacing}px` : spacing);
    }

    if (_changedProperties.has('color')) {
      const color = this.color ?? '';
      this.style.setProperty('--banana-divider-color', color);
    }
  }
}
