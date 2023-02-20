import { css, unsafeCSS } from 'lit';
import componentStyles from '../../styles/components.styles';
import { Colors, Variables as Var } from '../../styles/global-variables';

export default [
  componentStyles,
  css`
    :host {
      display: inline-block;
      position: relative;
      width: auto;
      cursor: pointer;
    }

    .button {
      display: inline-flex;
      align-items: stretch;
      justify-content: center;
      width: 100%;
      border-style: solid;
      border-width: var(--banana-button-boder-width, ${unsafeCSS(Var.InputBorderWidth)});
      border-radius: var(--banana-button-border-radius, ${unsafeCSS(Var.BorderRadiusSmall)});
      font-family: var(--banana-button-font-family, ${unsafeCSS(Var.InputFontFamily)});
      font-weight: var(--banana-button-font-weight, ${unsafeCSS(Var.FontWeightSemibold)});
      text-decoration: none;
      user-select: none;
      white-space: nowrap;
      vertical-align: middle;
      padding: 0;
      cursor: inherit;
      transition: ${unsafeCSS(Var.TransitionVeryFast)} background-color, ${unsafeCSS(Var.TransitionVeryFast)} color,
        ${unsafeCSS(Var.TransitionVeryFast)} border, ${unsafeCSS(Var.TransitionVeryFast)} box-shadow;
    }

    /* Default and Dashed */
    .button--default,
    .button--dashed {
      background-color: #fff;
      border-color: var(--banana-button-border-color-default, rgba(${unsafeCSS(Colors.Gray4)}, 1));
    }

    .button--dashed {
      border-style: dashed;
    }

    .button--default:hover:not(.button--disabled),
    .button--dashed:hover:not(.button--disabled) {
      color: var(--banana-color-primary-hover, ${unsafeCSS(Var.ColorPrimaryHover)});
      border-color: var(--banana-color-primary-hover, ${unsafeCSS(Var.ColorPrimaryHover)});
    }

    .button--default:active:not(.button--disabled),
    .button--dashed:active:not(.button--disabled) {
      color: var(--banana-color-primary-active, ${unsafeCSS(Var.ColorPrimaryActive)});
      border-color: var(--banana-color-primary-active, ${unsafeCSS(Var.ColorPrimaryActive)});
      box-shadow: 0px 0px 1px 0px var(--banana-color-primary-active, ${unsafeCSS(Var.ColorPrimaryActive)}),
        inset 0px 0px 1px 0px var(--banana-color-primary-active, ${unsafeCSS(Var.ColorPrimaryActive)});
    }

    /* Primary */
    .button--primary {
      background-color: var(--banana-color-primary, ${unsafeCSS(Var.ColorPrimary)});
      border-color: var(--banana-color-primary, ${unsafeCSS(Var.ColorPrimary)});
      color: #fff;
    }

    .button--primary:hover:not(.button--disabled) {
      background-color: var(--banana-color-primary-hover, ${unsafeCSS(Var.ColorPrimaryHover)});
      border-color: var(--banana-color-primary-hover, ${unsafeCSS(Var.ColorPrimaryHover)});
    }

    .button--primary:active:not(.button--disabled) {
      background-color: var(--banana-color-primary-active, ${unsafeCSS(Var.ColorPrimaryActive)});
      border-color: var(--banana-color-primary-active, ${unsafeCSS(Var.ColorPrimaryActive)});
    }

    /* Success */
    .button--success {
      background-color: var(--banana-color-success, ${unsafeCSS(Var.ColorSuccess)});
      border-color: var(--banana-color-success, ${unsafeCSS(Var.ColorSuccess)});
      color: #fff;
    }

    .button--success:hover:not(.button--disabled) {
      background-color: var(--banana-color-success-hover, ${unsafeCSS(Var.ColorSuccessHover)});
      border-color: var(--banana-color-success-hover, ${unsafeCSS(Var.ColorSuccessHover)});
    }

    .button--success:active:not(.button--disabled) {
      background-color: var(--banana-color-success-active, ${unsafeCSS(Var.ColorSuccessActive)});
      border-color: var(--banana-color-success-active, ${unsafeCSS(Var.ColorSuccessActive)});
    }

    /* Warning */
    .button--warning {
      background-color: var(--banana-color-warning, ${unsafeCSS(Var.ColorWarning)});
      border-color: var(--banana-color-warning, ${unsafeCSS(Var.ColorWarning)});
      color: #fff;
    }

    .button--warning:hover:not(.button--disabled) {
      background-color: var(--banana-color-warning-hover, ${unsafeCSS(Var.ColorWarningHover)});
      border-color: var(--banana-color-warning-hover, ${unsafeCSS(Var.ColorWarningHover)});
    }

    .button--warning:active:not(.button--disabled) {
      background-color: var(--banana-color-warning-active, ${unsafeCSS(Var.ColorWarningActive)});
      border-color: var(--banana-color-warning-active, ${unsafeCSS(Var.ColorWarningActive)});
    }

    /* Danger */
    .button--danger {
      background-color: var(--banana-color-danger, ${unsafeCSS(Var.ColorDanger)});
      border-color: var(--banana-color-danger, ${unsafeCSS(Var.ColorDanger)});
      color: #fff;
    }

    .button--danger:hover:not(.button--disabled) {
      background-color: var(--banana-color-danger-hover, ${unsafeCSS(Var.ColorDangerHover)});
      border-color: var(--banana-color-danger-hover, ${unsafeCSS(Var.ColorDangerHover)});
    }

    .button--danger:active:not(.button--disabled) {
      background-color: var(--banana-color-danger-active, ${unsafeCSS(Var.ColorDangerActive)});
      border-color: var(--banana-color-danger-active, ${unsafeCSS(Var.ColorDangerActive)});
    }

    /* Small */
    .button--small {
      height: var(--banana-button-height-small, ${unsafeCSS(Var.ButtonHeightSmall)});
      padding: var(--banana-button-padding-small, ${unsafeCSS(Var.ButtonPaddingSmall)});
    }

    /* Medium */
    .button--medium {
      height: var(--banana-button-height-medium ${unsafeCSS(Var.ButtonHeightMedium)});
      padding: var(--banana-button-padding-medium, ${unsafeCSS(Var.ButtonPaddingMedium)});
    }

    /* Large */
    .button--large {
      height: var(--banana-button-height-large, ${unsafeCSS(Var.ButtonHeightLarge)});
      padding: var(--banana-button-padding-large, ${unsafeCSS(Var.ButtonPaddingLarge)});
    }

    /* Pill */
    .button--pill.button--small {
      border-radius: var(--banana-button-height-small, ${unsafeCSS(Var.ButtonHeightSmall)});
    }

    .button--pill.button--medium {
      border-radius: var(--banana-button-height-medium, ${unsafeCSS(Var.ButtonHeightMedium)});
    }

    .button--pill.button--large {
      border-radius: var(--banana-button-height-large, ${unsafeCSS(Var.ButtonHeightLarge)});
    }

    /* Outline */
    .button--outline:not(:hover):not(:active) {
      background-color: transparent !important;
    }

    .button--outline.button--primary:not(:hover):not(:active) {
      color: var(--banana-color-primary, ${unsafeCSS(Var.ColorPrimary)});
    }

    .button--outline.button--success:not(:hover):not(:active) {
      color: var(--banana-color-success, ${unsafeCSS(Var.ColorSuccess)});
    }

    .button--outline.button--warning:not(:hover):not(:active) {
      color: var(--banana-color-warning, ${unsafeCSS(Var.ColorWarning)});
    }

    .button--outline.button--danger:not(:hover):not(:active) {
      color: var(--banana-color-danger, ${unsafeCSS(Var.ColorDanger)});
    }
  `,
];
