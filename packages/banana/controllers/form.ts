import type { LitElement, ReactiveController, ReactiveControllerHost } from 'lit';
import type BButton from '../src/button';

export class FormController implements ReactiveController {
  host: ReactiveControllerHost & LitElement;
  form?: HTMLFormElement | null;

  constructor(host: ReactiveControllerHost & LitElement) {
    this.host = host;
    host.addController(this);
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

        // ['formaction', 'formenctype', 'formmethod', 'formnovalidate', 'formtarget'].forEach((attr) => {
        //   if (submitter.hasAttribute(attr)) {
        //     button.setAttribute(attr, submitter.getAttribute(attr)!);
        //   }
        // });
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
      // this.form.addEventListener('submit', this._handleFormSubmit.bind(this));
      // this.form.addEventListener('reset', this._handleFormReset.bind(this));
      this.form.addEventListener('formdata', this._handleFormData.bind(this));
    }
  }

  private _unbindForm() {
    if (this.form) {
      // this.form.removeEventListener('submit', this._handleFormSubmit.bind(this));
      // this.form.removeEventListener('reset', this._handleFormReset.bind(this));
      this.form.removeEventListener('formdata', this._handleFormData.bind(this));
      this.form = undefined;
    }
  }

  private _handleFormData(event: FormDataEvent) {
    // Todo: handle formdata event...
    // console.log('formdata event fired', event);
    // const formData = event.formData;
    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
  }
}
