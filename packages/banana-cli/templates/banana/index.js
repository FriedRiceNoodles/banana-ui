/* eslint-env node */

const toCamelCase = require('../toCamelCase');

const template = (componentName, formField) => {
  return `import { CSSResultGroup, html, LitElement } from 'lit';
import { customElement${formField ? ', property' : ''} } from 'lit/decorators.js';
import styles from './index.styles';
${formField ? `import { BananaFormElement, FormController } from 'packages/banana/controllers/form';` : ''}

@customElement('b-${componentName}')
export default class B${toCamelCase(componentName)} extends LitElement ${
    formField ? `implements BananaFormElement ` : ''
  }{
  ${
    formField
      ? `
  private readonly formController = new FormController(this);
  `
      : ''
  }
  static styles?: CSSResultGroup = styles;
  ${
    formField
      ? `
      @property()
      name = '';
    
      @property()
      value = '';
    
      @property({ reflect: true, attribute: 'default-value' })
      defaultValue = '';
    
      @property()
      form: string | undefined;
    
      @property({ type: Boolean, reflect: true })
      disabled = false;
    
      @property({ type: Boolean, reflect: true })
      required = false;

      @property({ type: Boolean, reflect: true })
      readonly = false;

      @property({ type: Boolean, reflect: true })
      controlled = false;

      // Pass the reportValidity() method to the form controller.
      reportValidity() {
        return this.required ? (this.value?.length || 0) > 0 : true;
      }

      checkValidity() {
        return this.required ? (this.value?.length || 0) > 0 : true;
      }

      private _handleChange() {
        const value = 'a value should be passed here';
        // do something with the value...
    
        const eventOptions = { bubbles: false, cancelable: false, composed: true, detail: { value } };
        this.dispatchEvent(new CustomEvent('change', eventOptions));
      }
      `
      : ''
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  render() {
    return html\` <div>New Component!</div> \`;
  }
}`;
};

module.exports = template;
