import { css, unsafeCSS } from 'lit';
import componentStyles from '../../styles/components.styles';
import { Variables as Var } from '../../styles/global-variables';

export default [
  componentStyles,
  css`
    :host {
      display: inline-block;
    }

    .checkbox {
      display: flex;
      align-items: center;
      cursor: pointer;
      user-select: none;
      outline: none;
      position: relative;
    }

    .checkbox__validation-input {
      position: absolute;
      visibility: hidden;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: -1;
      width: 0;
      height: 0;
    }

    .checkbox__control {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--banana-checkbox-control-border-color, ${unsafeCSS(Var.CheckboxControlBorderColor)});
      border-radius: 4px;
      transition: all ${unsafeCSS(Var.TransitionNormal)};
    }

    .checkbox__control::after {
      content: '';
      position: absolute;
      display: block;
      border: 2px solid var(--banana-checkbox-control-checkmark-color, #fff);
      border-top: 0;
      border-left: 0;
      transform: rotate(45deg) scale(0) translate(-50%, -50%);
      top: 50%;
      transition: all ${unsafeCSS(Var.TransitionNormal)};
    }

    .checkbox:focus-visible .checkbox__control:not(.checkbox__control--disabled, .checkbox__control--readonly)::before {
      content: '';
      position: absolute;
      display: block;
      border: 2px solid var(--banana-color-primary, ${unsafeCSS(Var.ColorPrimary)});
      border-radius: 4px;
      top: -3px;
      right: -3px;
      bottom: -3px;
      left: -3px;
    }

    .checkbox--checked .checkbox__control::after {
      transform: rotate(45deg) scale(1) translate(-50%, -50%);
    }

    .checkbox--small .checkbox__control {
      width: var(--banana-checkbox-control-size-small, ${unsafeCSS(Var.CheckboxSizeSmall)});
      height: var(--banana-checkbox-control-size-small, ${unsafeCSS(Var.CheckboxSizeSmall)});
    }

    .checkbox--medium .checkbox__control {
      width: var(--banana-checkbox-control-size-medium, ${unsafeCSS(Var.CheckboxSizeMedium)});
      height: var(--banana-checkbox-control-size-medium, ${unsafeCSS(Var.CheckboxSizeMedium)});
    }

    .checkbox--large .checkbox__control {
      width: var(--banana-checkbox-control-size-large, ${unsafeCSS(Var.CheckboxSizeLarge)});
      height: var(--banana-checkbox-control-size-large, ${unsafeCSS(Var.CheckboxSizeLarge)});
    }

    .checkbox--small .checkbox__control:not(.checkbox__control--indeterminate)::after {
      left: calc(var(--banana-checkbox-control-size-small, ${unsafeCSS(Var.CheckboxSizeSmall)}) * 0.2);
      width: calc(var(--banana-checkbox-control-size-small, ${unsafeCSS(Var.CheckboxSizeSmall)}) * 0.3);
      height: calc(var(--banana-checkbox-control-size-small, ${unsafeCSS(Var.CheckboxSizeSmall)}) * 0.6);
    }

    .checkbox--medium .checkbox__control:not(.checkbox__control--indeterminate)::after {
      left: calc(var(--banana-checkbox-control-size-medium, 16px) * 0.2);
      width: calc(var(--banana-checkbox-control-size-medium, ${unsafeCSS(Var.CheckboxSizeMedium)}) * 0.3);
      height: calc(var(--banana-checkbox-control-size-medium, ${unsafeCSS(Var.CheckboxSizeMedium)}) * 0.6);
    }

    .checkbox--large .checkbox__control:not(.checkbox__control--indeterminate)::after {
      left: calc(var(--banana-checkbox-control-size-large, ${unsafeCSS(Var.CheckboxSizeLarge)}) * 0.2);
      width: calc(var(--banana-checkbox-control-size-large, ${unsafeCSS(Var.CheckboxSizeLarge)}) * 0.3);
      height: calc(var(--banana-checkbox-control-size-large, ${unsafeCSS(Var.CheckboxSizeLarge)}) * 0.6);
    }

    .checkbox--indeterminate .checkbox__control--indeterminate::after {
      border: none;
      transform: rotate(0) scale(1) translate(-50%, -50%);
      left: 50%;
      width: 50%;
      height: 50%;
      background-color: var(--banana-color-primary, ${unsafeCSS(Var.ColorPrimary)});
    }

    .checkbox--small .checkbox__label {
      font-size: var(--banana-checkbox-label-font-size-small, ${unsafeCSS(Var.CheckboxFontSizeSmall)});
      margin-left: var(--banana-checkbox-label-margin-left, 0.5em);
    }

    .checkbox--medium .checkbox__label {
      font-size: var(--banana-checkbox-label-font-size-medium, ${unsafeCSS(Var.CheckboxFontSizeMedium)});
      margin-left: var(--banana-checkbox-label-margin-left, 0.5em);
    }

    .checkbox--large .checkbox__label {
      font-size: var(--banana-checkbox-label-font-size-large, ${unsafeCSS(Var.CheckboxFontSizeLarge)});
      margin-left: var(--banana-checkbox-label-margin-left, 0.5em);
    }

    .checkbox:hover .checkbox__control:not(.checkbox__control--disabled, .checkbox__control--readonly) {
      border-color: var(--banana-color-primary, ${unsafeCSS(Var.ColorPrimary)});
    }

    .checkbox--checked:hover .checkbox__control:not(.checkbox__control--disabled, .checkbox__control--readonly) {
      opacity: 0.75;
    }

    .checkbox__control--checked:not(.checkbox__control--indeterminate) {
      background-color: var(--banana-color-primary, ${unsafeCSS(Var.ColorPrimary)});
      border-color: var(--banana-color-primary, ${unsafeCSS(Var.ColorPrimary)});
    }

    .checkbox--disabled .checkbox__control,
    .checkbox--readonly .checkbox__control,
    .checkbox--disabled .checkbox__label,
    .checkbox--readonly .checkbox__label {
      pointer-events: none;
    }

    .checkbox--disabled {
      cursor: not-allowed;
    }

    .checkbox--readonly {
      cursor: default;
    }

    .checkbox--disabled .checkbox__control,
    .checkbox--disabled .checkbox__label {
      opacity: 0.5;
    }
  `,
];
