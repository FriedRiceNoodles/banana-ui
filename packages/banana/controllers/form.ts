import type { LitElement, ReactiveController, ReactiveControllerHost } from 'lit';
import type BButton from '../src/button';

export interface BananaFormElement extends LitElement {
  name: string;
  value: string | number | boolean;
  disabled?: boolean;
  defaultValue?: string | number | boolean;
  form?: string;

  reportValidity: () => boolean;
  checkValidity: () => boolean;
}

export class FormController implements ReactiveController {
  host: ReactiveControllerHost & BananaFormElement;
  form?: HTMLFormElement | null;

  constructor(host: ReactiveControllerHost & BananaFormElement) {
    this.host = host;
    host.addController(this);

    this._handleFormData = this._handleFormData.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormReset = this._handleFormReset.bind(this);
    this._reportOrCheckFormValidity = this._reportOrCheckFormValidity.bind(this);
  }

  hostConnected() {
    this._findForm();
  }

  hostDisconnected() {
    this._unbindForm();
  }

  submit(submitter?: HTMLButtonElement | BButton) {
    if (this.form) {
      const button = document.createElement('button');
      button.type = 'submit';
      button.style.position = 'absolute';
      button.style.width = '0';
      button.style.height = '0';
      button.style.clipPath = 'inset(50%)';
      button.style.overflow = 'hidden';
      button.style.whiteSpace = 'nowrap';

      // Why not just use submitter but create a new button?
      // Because submitter may be a custom element, which is not allowed to be used as a form submitter.
      // See https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/requestSubmit#exceptions
      if (submitter) {
        button.name = submitter.name;
        button.value = submitter.value;

        ['formaction', 'formenctype', 'formmethod', 'formnovalidate', 'formtarget'].forEach((attr) => {
          if (submitter.hasAttribute(attr)) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            button.setAttribute(attr, submitter.getAttribute(attr)!);
          }
        });
      }

      this.form.appendChild(button);

      // Use requestSubmit() rather than submit(), because the latter does not trigger the browser's built-in form validation.
      // See https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/requestSubmit
      // But it seems that requestSubmit() needs to be polyfilled.
      this.form.requestSubmit(button);
      button.remove();
    }
  }

  reset() {
    if (this.form) {
      this.form.reset();
    }
  }

  private _findForm() {
    const formItem = this.host;
    // If the form attribute is set, go find the form by ID.
    if (formItem.hasAttribute('form') && formItem.getAttribute('form') !== '') {
      const root = this.host.getRootNode() as ShadowRoot | Document;
      const formId = formItem.getAttribute('form');

      if (formId) {
        const form = root.querySelector(`#${formId}`) as HTMLFormElement;
        this._bindForm(form);
      }
    }

    // If the form attribute is not set, find the closest form.
    if (!this.form) {
      this._bindForm(formItem.closest('form'));
    }
  }

  private _bindForm(form: HTMLFormElement | null) {
    if (form) {
      this.form = form;
      this.form.addEventListener('submit', this._handleFormSubmit);
      this.form.addEventListener('reset', this._handleFormReset);
      this.form.addEventListener('formdata', this._handleFormData);

      this.form.reportValidity = () => this._reportOrCheckFormValidity(true);
      this.form.checkValidity = () => this._reportOrCheckFormValidity(false);
    }
  }

  private _unbindForm() {
    if (this.form) {
      this.form.removeEventListener('submit', this._handleFormSubmit);
      this.form.removeEventListener('reset', this._handleFormReset);
      this.form.removeEventListener('formdata', this._handleFormData);
      this.form = undefined;
    }
  }

  private _handleFormData(event: FormDataEvent) {
    const name = this.host.name;
    const value = this.host.value;
    const disabled = this.host.disabled;

    if (!disabled && typeof name === 'string' && name.length > 0 && typeof value !== 'undefined') {
      event.formData.append(name, value.toString());
    }
  }

  private _handleFormSubmit(event: Event) {
    const disabled = this.host.disabled;
    // Here is not the form's reportValidity() method, but the element's reportValidity() method.
    const reportValidity = this.host.reportValidity.bind(this.host);

    if (this.form && !this.form.noValidate && !disabled && typeof reportValidity === 'function') {
      if (!reportValidity()) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }
  }

  private _handleFormReset() {
    this.host.value = this.host.defaultValue || '';
  }

  private _reportOrCheckFormValidity(report = true) {
    if (this.form && !this.form.noValidate) {
      // Query all elements is necessary, because the form may contain native input elements, banana input elements, and other custom elements.
      const elements = this.form.querySelectorAll<HTMLInputElement>('*');

      for (const element of elements) {
        const method = report ? element.reportValidity : element.checkValidity;

        if (typeof method === 'function') {
          const result = method.call(element);
          if (!result) {
            return false;
          }
        }
      }
    }

    return true;
  }
}
