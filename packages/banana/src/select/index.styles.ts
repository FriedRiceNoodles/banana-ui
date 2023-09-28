import { css, unsafeCSS } from 'lit';
import componentStyles from '../../styles/components.styles';
import { Variables as Var } from '../../styles/global-variables';

export default [
  componentStyles,
  css`
    :host {
      display: inline-block;
      vertical-align: middle;
      min-width: 120px;
    }

    .select {
      position: relative;
    }

    .select__selector {
      border: var(--banana-select-selector-border, ${unsafeCSS(Var.SelectCommonGray)} solid 1px);
      border-radius: var(--banana-select-border-radius, ${unsafeCSS(Var.SelectBorderRadius)});
      box-sizing: border-box;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;

      padding: 0 12px;
      font-size: 14px;
      height: 32px;

      transition: all ${unsafeCSS(Var.TransitionFast)} ease;
    }

    .select__selector:not(.select__selector--disabled):hover {
      border-color: var(--banana-color-primary-hover, ${unsafeCSS(Var.ColorPrimaryHover)});
    }

    .select__selector.select__selector--active:not(.select__selector--disabled) {
      border-color: var(--banana-color-primary-active, ${unsafeCSS(Var.ColorPrimaryActive)});
      box-shadow: 0px 0px 1px 0px var(--banana-color-primary-active, ${unsafeCSS(Var.ColorPrimaryActive)}),
        inset 0px 0px 1px 0px var(--banana-color-primary-active, ${unsafeCSS(Var.ColorPrimaryActive)});
    }

    .default-expand-icon {
      margin-left: 4px;
      transform: rotate(90deg);
    }

    .select__listbox {
      width: max-content;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      z-index: 100;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: var(--banana-select-border-radius, ${unsafeCSS(Var.SelectBorderRadius)});
      box-shadow: var(--banana-select-list-box-shadow, ${unsafeCSS(Var.SelectListBoxShadow)});
      padding: var(--banana-select-list-padding, ${unsafeCSS(Var.SelectListPadding)});
    }
  `,
];
