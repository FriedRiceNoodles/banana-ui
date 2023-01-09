import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('b-button')
export default class BButton extends LitElement {
  @property({ reflect: true }) type:
    | 'default'
    | 'primary'
    | 'success'
    | 'warning'
    | 'danger' = 'default';

  @property({ reflect: true }) size: 'small' | 'default' | 'large' = 'default';

  render() {
    return html`
      <button
        class=${classMap({
          button: true,
          'button--default': this.type === 'default',
          'button--primary': this.type === 'primary',
          'button--success': this.type === 'success',
          'button--warning': this.type === 'warning',
          'button--danger': this.type === 'danger',
          'button--small': this.size === 'small',
          'button--medium': this.size === 'default',
          'button--large': this.size === 'large',
        })}
      >
        <slot part="content" class="button__content"></slot>
      </button> `;
  }
}
