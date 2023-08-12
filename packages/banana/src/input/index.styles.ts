import { css, unsafeCSS } from 'lit';
import componentStyles from '../../styles/components.styles';
import { Variables as Var } from '../../styles/global-variables';

export default [
  componentStyles,
  css`
    :host {
      display: block;
    }

    .input__wrapper {
      display: flex;
      align-items: center;
      border: var(--banana-input-border-width, ${unsafeCSS(Var.InputBorderWidth)}) solid
        var(--banana-input-border-color, ${unsafeCSS(Var.InputBorderColor)});
      font-family: var(--banana-input-font-family, ${unsafeCSS(Var.InputFontFamily)});
      transition: all ${unsafeCSS(Var.TransitionFast)};
      line-height: 1.5;
      color: fieldtext;
      background-color: var(--banana-input-background-color, ${unsafeCSS(Var.InputBackgroundColor)});
    }

    .input__wrapper:hover:not(.input__wrapper--disabled) {
      border-color: var(--banana-input-border-hover-color, ${unsafeCSS(Var.InputBorderHoverColor)});
    }

    .input__wrapper.input__wrapper--focusing:not(.input__wrapper--disabled) {
      border-color: var(--banana-input-border-focus-color, ${unsafeCSS(Var.ColorPrimary)});
      box-shadow: var(--banana-input-box-shadow-focus, ${unsafeCSS(Var.InputBoxShadowFocus)});
    }

    .input__wrapper--small {
      font-size: var(--banana-input-font-size-small, ${unsafeCSS(Var.InputFontSizeSmall)});
      min-height: var(--banana-input-height-small, ${unsafeCSS(Var.InputHeightSmall)});
      padding: var(--banana-input-padding-small, ${unsafeCSS(Var.InputPaddingSmall)});
      border-radius: var(--banana-input-border-radius-small, ${unsafeCSS(Var.InputBorerRadiusSmall)});
    }

    .input__wrapper--medium {
      font-size: var(--banana-input-font-size-medium, ${unsafeCSS(Var.InputFontSizeMedium)});
      min-height: var(--banana-input-height-medium, ${unsafeCSS(Var.InputHeightMedium)});
      padding: var(--banana-input-padding-medium, ${unsafeCSS(Var.InputPaddingMedium)});
      border-radius: var(--banana-input-border-radius-medium, ${unsafeCSS(Var.InputBorerRadiusMedium)});
    }

    .input__wrapper--large {
      font-size: var(--banana-input-font-size-large, ${unsafeCSS(Var.InputFontSizeLarge)});
      min-height: var(--banana-input-height-large, ${unsafeCSS(Var.InputHeightLarge)});
      padding: var(--banana-input-padding-large, ${unsafeCSS(Var.InputPaddingLarge)});
      border-radius: var(--banana-input-border-radius-large, ${unsafeCSS(Var.InputBorerRadiusLarge)});
    }

    .input__wrapper--disabled {
      color: var(--banana-input-disabled-color, ${unsafeCSS(Var.InputDisabledColor)});
      background-color: var(--banana-input-disabled-background-color, ${unsafeCSS(Var.InputDisabledBackgroundColor)});
      border-color: var(--banana-input-disabled-border-color, ${unsafeCSS(Var.InputDisabledBorderColor)});
      cursor: not-allowed;
    }

    .input {
      flex: 1;
      padding: 0;
      margin: 0;
      font-size: inherit;
      line-height: inherit;
      font-family: inherit;
      font-weight: inherit;
      border: none;
      outline: none;
      box-shadow: none;
      cursor: inherit;
      appearance: none;
    }

    .input:disabled {
      color: inherit;
      background-color: transparent;
    }

    .input:-webkit-autofill,
    .input:-webkit-autofill:hover,
    .input:-webkit-autofill:focus,
    .input:-webkit-autofill:active {
      color: inherit;
      background-color: transparent;
      /* Override the default styles of the autofill input. */
      box-shadow: 0 0 0 var(--banana-input-height-large, ${unsafeCSS(Var.InputHeightLarge)})
        var(--banana-input-background-color, ${unsafeCSS(Var.InputBackgroundColor)}) inset !important;
    }
  `,
];
