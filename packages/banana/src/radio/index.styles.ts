import { css, unsafeCSS } from 'lit';
import componentStyles from '../../styles/components.styles';
import { Variables as Var } from '../../styles/global-variables';

export default [
  componentStyles,
  css`
    :host {
      display: inline-block;
      margin-right: var(--banana-radio-margin-right, ${unsafeCSS(Var.RadioMarginRight)});
    }

    .radio {
      display: flex;
      align-items: center;
    }

    .radio:not(.radio--disabled) {
      cursor: pointer;
    }

    .radio--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .radio__label {
      padding: var(--banana-radio-label-padding, 0 0.5em);
    }

    .radio__control {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--banana-radio-control-border-color, ${unsafeCSS(Var.RadioControlBorderColor)});
      border-radius: 50%;
      transition: all ${unsafeCSS(Var.TransitionNormal)};
    }

    .radio--checked:not(.radio--disabled) .radio__control {
      background-color: var(--banana-color-primary, ${unsafeCSS(Var.ColorPrimary)});
      border-color: var(--banana-color-primary, ${unsafeCSS(Var.ColorPrimary)});
    }

    .radio--checked:not(.radio--disabled) .radio__control::after {
      content: '';
      position: absolute;
      display: block;
      width: 50%;
      height: 50%;
      border-radius: 50%;
      background-color: #fff;
    }

    .radio:not(.radio--disabled):hover .radio__control {
      border-color: var(--banana-color-primary, ${unsafeCSS(Var.ColorPrimary)});
    }

    .radio--small .radio__control {
      width: var(--banana-radio-control-size-small, ${unsafeCSS(Var.RadioSizeSmall)});
      height: var(--banana-radio-control-size-small, ${unsafeCSS(Var.RadioSizeSmall)});
    }

    .radio--medium .radio__control {
      width: var(--banana-radio-control-size-medium, ${unsafeCSS(Var.RadioSizeMedium)});
      height: var(--banana-radio-control-size-medium, ${unsafeCSS(Var.RadioSizeMedium)});
    }

    .radio--large .radio__control {
      width: var(--banana-radio-control-size-large, ${unsafeCSS(Var.RadioSizeLarge)});
      height: var(--banana-radio-control-size-large, ${unsafeCSS(Var.RadioSizeLarge)});
    }

    .radio--small .radio__label {
      font-size: var(--banana-radio-label-font-size-small, ${unsafeCSS(Var.RadioFontSizeSmall)});
    }

    .radio--medium .radio__label {
      font-size: var(--banana-radio-label-font-size-medium, ${unsafeCSS(Var.RadioFontSizeMedium)});
    }

    .radio--large .radio__label {
      font-size: var(--banana-radio-label-font-size-large, ${unsafeCSS(Var.RadioFontSizeLarge)});
    }
  `,
];
