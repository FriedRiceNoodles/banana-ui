import type { LitElement, ReactiveController, ReactiveControllerHost } from 'lit';
import type BButton from '../src/button';

export interface BananaFormProperties {
  name: string;
  value: string | number | boolean | string[] | number[];
  disabled: boolean;
  required?: boolean;
  // When an element is controlled, it means that the value of the element is controlled by the parent component.
  controlled?: boolean;
  defaultValue?: string | number | boolean | string[] | number[];
  form?: string;

  reportValidity: () => boolean;
  checkValidity: () => boolean;
}

export type BananaFormElement = LitElement & BananaFormProperties;

/**
 * Example:
 * ```ts
 * const overriddenProperties = [
 *  ['value', 'checked'],
 *  ['defaultValue', 'defaultChecked'],
 * ] as const;
 * ```
 *
 * Tips: This is a TypeScript feature called "const assertions". Without it, the type of the array will be `readonly [string, string][]`.
 * See https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions
 */
export type OverriddenPropertiesType = ReadonlyArray<readonly [keyof BananaFormProperties, string]>;

/**
 * If the element overrides some properties, the type of the element should be `BananaFormElementWithOverriddenProperties`.
 * Otherwise, the type of the element should be `BananaFormElement`.
 * BananaFormElementWithOverriddenProperties should be passed a generic parameter, which is the type of the `overriddenProperties` variable,
 * and it should be a readonly array of readonly tuples.
 * You can see the example above(type `OverriddenPropertiesType`).
 */
export type BananaFormElementWithOverriddenProperties<OverriddenProperties extends OverriddenPropertiesType = []> =
  Omit<BananaFormProperties, OverriddenProperties[number][0]> & {
    [K in OverriddenProperties[number][1]]: BananaFormElement[OverriddenProperties[number][0]];
  } & LitElement;

export class FormController<T extends OverriddenPropertiesType> implements ReactiveController {
  host: ReactiveControllerHost & (BananaFormElement | BananaFormElementWithOverriddenProperties<T>);
  form?: HTMLFormElement | null;
  overrideProperties: OverriddenPropertiesType;

  constructor(
    host: ReactiveControllerHost & (BananaFormElement | BananaFormElementWithOverriddenProperties<T>),
    overriddenProperties: OverriddenPropertiesType = [],
  ) {
    this.host = host;
    host.addController(this);
    this.overrideProperties = overriddenProperties;

    this._handleFormData = this._handleFormData.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormReset = this._handleFormReset.bind(this);
    this._reportOrCheckFormValidity = this._reportOrCheckFormValidity.bind(this);
  }

  getProperty<Name extends keyof BananaFormProperties>(name: Name) {
    const overriddenPropertyName = this.overrideProperties.find((item) => item[0] === name)?.[1];
    return {
      isOverridden: typeof overriddenPropertyName === 'string',
      key: overriddenPropertyName ?? name,
      value: this.host[name],
    };
  }

  setProperty<Name extends keyof BananaFormProperties>(name: Name, value: BananaFormProperties[Name]) {
    const overriddenPropertyName = this.overrideProperties.find((item) => item[0] === name)?.[1];
    if (typeof overriddenPropertyName === 'string') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this.host as BananaFormElementWithOverriddenProperties<any>)[overriddenPropertyName] = value;
    } else {
      (this.host as BananaFormProperties)[name] = value;
    }
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
      if (typeof this.form.requestSubmit === 'function') {
        this.form.requestSubmit(button);
      } else {
        button.click();
      }
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
    const formId = this.getProperty('form').value;
    // If the form attribute is set, go find the form by ID.
    if (formId) {
      const root = this.host.getRootNode() as ShadowRoot | Document;

      const form = root.querySelector(`#${formId}`) as HTMLFormElement;
      this._bindForm(form);
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
    const name = this.getProperty('name').value;
    const value = this.getProperty('value').value;
    const disabled = this.getProperty('disabled').value;

    if (!disabled && typeof name === 'string' && name.length > 0 && typeof value !== 'undefined') {
      event.formData.append(name, value.toString());
    }
  }

  private _handleFormSubmit(event: Event) {
    const disabled = this.getProperty('disabled').value;
    // Here is not the form's reportValidity() method, but the element's reportValidity() method.
    const reportValidity = this.getProperty('reportValidity').value.bind(this.host);

    if (this.form && !this.form.noValidate && !disabled && typeof reportValidity === 'function') {
      if (!reportValidity()) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }
  }

  private _handleFormReset() {
    const value = this.getProperty('defaultValue').value ?? '';
    if (!this.getProperty('controlled').value) {
      this.setProperty('value', value);
    } else {
      const eventOptions = { bubbles: false, cancelable: false, composed: true, detail: { value } };
      this.host.dispatchEvent(new CustomEvent('change', eventOptions));
    }
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
