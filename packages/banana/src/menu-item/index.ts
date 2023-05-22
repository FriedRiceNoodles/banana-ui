import { CSSResultGroup, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import styles from './index.styles';

@customElement('b-menu-item')
export default class BMenuItem extends LitElement {
  connectedCallback() {
    super.connectedCallback();

    this.addEventListener('click', this.handleHostClick);
    this.setAttribute('role', 'menuitem');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.handleHostClick);
  }

  static styles: CSSResultGroup = styles;

  // The key to tell `Menu` and `Events` which item has been selected.
  @property({ reflect: true })
  value = '';

  @property({ reflect: true, type: Boolean })
  disabled = false;

  private handleHostClick(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  protected willUpdate(_changedProperties: PropertyValueMap<this>): void {
    if (_changedProperties.has('disabled')) {
      this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
    }
  }

  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          'menu-item': true,
          'menu-item--disabled': this.disabled,
        })}
      >
        <slot part="label" class="menu-item__label"></slot>
      </div>
    `;
  }
}
