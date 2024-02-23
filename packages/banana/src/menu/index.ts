import { CSSResultGroup, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import type BMenuItem from '../menu-item';
import styles from './index.styles';

@customElement('b-menu')
export default class BMenu extends LitElement {
  connectedCallback() {
    super.connectedCallback();

    this.setAttribute('role', 'menu');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  static styles: CSSResultGroup = styles;

  private handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const item = target.closest('b-menu-item') as BMenuItem;

    if (!item || item.disabled) {
      return;
    }

    this.dispatchEvent(new CustomEvent('select', { detail: { item: item.value } }));
  }

  // todo...
  private handleKeydown(event: KeyboardEvent) {
    return event;
  }

  render() {
    return html` <slot @click=${this.handleClick} @keydown=${this.handleKeydown}></slot> `;
  }
}
