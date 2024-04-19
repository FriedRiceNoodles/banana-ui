import { css, unsafeCSS } from 'lit';
import componentStyles from '../../styles/components.styles';
import { Variables as Var } from '../../styles/global-variables';

export default [
  componentStyles,
  css`
    :host {
      display: block;
      width: 100%;
    }

    .textarea__wrapper {
      display: flex;
      align-items: center;
      position: relative;
      width: 100%;
      border: var(--banana-input-border-width, ${unsafeCSS(Var.InputBorderWidth)}) solid
        var(--banana-input-border-color, ${unsafeCSS(Var.InputBorderColor)});
      font-family: var(--banana-input-font-family, ${unsafeCSS(Var.InputFontFamily)});
      transition: all ${unsafeCSS(Var.TransitionFast)};
      line-height: 1.5;
      color: fieldtext;
      background-color: var(--banana-input-background-color, ${unsafeCSS(Var.InputBackgroundColor)});
    }

    .textarea__wrapper:hover:not(.textarea__wrapper--disabled) {
      border-color: var(--banana-input-border-hover-color, ${unsafeCSS(Var.InputBorderHoverColor)});
    }

    .textarea__wrapper.textarea__wrapper--focusing:not(.textarea__wrapper--disabled) {
      border-color: var(--banana-input-border-focus-color, ${unsafeCSS(Var.ColorPrimary)});
      box-shadow: var(--banana-input-box-shadow-focus, ${unsafeCSS(Var.InputBoxShadowFocus)});
    }

    .textarea__wrapper--small {
      font-size: var(--banana-input-font-size-small, ${unsafeCSS(Var.InputFontSizeSmall)});
      min-height: var(--banana-input-height-small, ${unsafeCSS(Var.InputHeightSmall)});
      border-radius: var(--banana-input-border-radius-small, ${unsafeCSS(Var.InputBorderRadiusSmall)});
    }

    .textarea__wrapper--small .textarea {
      padding: var(--banana-input-padding-small, ${unsafeCSS(Var.InputPaddingSmall)});
    }

    .textarea__wrapper--medium {
      font-size: var(--banana-input-font-size-medium, ${unsafeCSS(Var.InputFontSizeMedium)});
      min-height: var(--banana-input-height-medium, ${unsafeCSS(Var.InputHeightMedium)});
      border-radius: var(--banana-input-border-radius-medium, ${unsafeCSS(Var.InputBorderRadiusMedium)});
    }

    .textarea__wrapper--medium .textarea {
      padding: var(--banana-input-padding-medium, ${unsafeCSS(Var.InputPaddingMedium)});
    }

    .textarea__wrapper--large {
      font-size: var(--banana-input-font-size-large, ${unsafeCSS(Var.InputFontSizeLarge)});
      min-height: var(--banana-input-height-large, ${unsafeCSS(Var.InputHeightLarge)});
      border-radius: var(--banana-input-border-radius-large, ${unsafeCSS(Var.InputBorderRadiusLarge)});
    }

    .textarea__wrapper--large .textarea {
      padding: var(--banana-input-padding-large, ${unsafeCSS(Var.InputPaddingLarge)});
    }

    .textarea__wrapper--disabled {
      color: var(--banana-input-disabled-color, ${unsafeCSS(Var.InputDisabledColor)});
      background-color: var(--banana-input-disabled-background-color, ${unsafeCSS(Var.InputDisabledBackgroundColor)});
      border-color: var(--banana-input-disabled-border-color, ${unsafeCSS(Var.InputDisabledBorderColor)});
      cursor: not-allowed;
    }

    .textarea {
      flex: 1 1 auto;
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

    .textarea::-webkit-search-decoration,
    .textarea::-webkit-search-cancel-button,
    .textarea::-webkit-search-results-button,
    .textarea::-webkit-search-results-decoration {
      -webkit-appearance: none;
    }

    .textarea::placeholder {
      user-select: none;
      -webkit-user-select: none;
    }

    .textarea:focus {
      outline: none;
    }

    .textarea:-webkit-autofill,
    .textarea:-webkit-autofill:hover,
    .textarea:-webkit-autofill:focus,
    .textarea:-webkit-autofill:active {
      color: inherit;
      background-color: transparent;
      /* Override the default styles of the autofill input. */
      box-shadow: 0 0 0 var(--banana-input-height-large, ${unsafeCSS(Var.InputHeightLarge)})
        var(--banana-input-background-color, ${unsafeCSS(Var.InputBackgroundColor)}) inset !important;
    }
  `,
];
