import { css, unsafeCSS } from 'lit';
import componentStyles from '../../styles/components.styles';
import { Colors, Variables as Var } from '../../styles/global-variables';

export default [
  componentStyles,
  css`
    :host {
      display: inline-block;
      vertical-align: middle;
      min-width: 120px;
    }

    :host(:focus-visible) {
      outline: none;
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
      padding: 0 24px 0 12px;
      font-size: 14px;
      min-height: 32px;
      transition: all ${unsafeCSS(Var.TransitionFast)} ease;
      user-select: none;
      position: relative;
    }

    .select__selector:not(.select__selector--disabled):hover {
      border-color: var(--banana-color-primary-hover, ${unsafeCSS(Var.ColorPrimaryHover)});
    }

    .select__selector.select__selector--active:not(.select__selector--disabled),
    :host(:focus-visible) .select__selector:not(.select__selector--disabled) {
      border-color: var(--banana-color-primary-active, ${unsafeCSS(Var.ColorPrimaryActive)});
      box-shadow: 0px 0px 1px 0px var(--banana-color-primary-active, ${unsafeCSS(Var.ColorPrimaryActive)}),
        inset 0px 0px 1px 0px var(--banana-color-primary-active, ${unsafeCSS(Var.ColorPrimaryActive)});
    }

    .select-selector__title,
    .select-selector__placeholder {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .select-selector__placeholder {
      color: var(--banana-select-placeholder-color, ${unsafeCSS(Var.SelectCommonGray)});
    }

    .default-expand-icon {
      position: absolute;
      right: 8px;
      top: 50%;
      margin-left: 4px;
      transform: translateY(-50%) rotate(90deg);
      flex-shrink: 0;
      color: var(--banana-select-expand-icon-color, ${unsafeCSS(Var.SelectCommonGray)});
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
      max-height: var(--banana-select-list-max-height, 260px);
      overflow-y: auto;
    }

    .select-selector__multiple-options-container {
      max-width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 4px;
      padding: 3px 0;
    }

    .select-selector__multiple-option {
      display: flex;
      gap: 4px;
      max-width: 100%;
      box-sizing: border-box;
      padding: 0 6px;
      height: 24px;
      line-height: 24px;
      user-select: none;
      background-color: var(
        --banana-select-multiple-option-background-color,
        ${unsafeCSS(Var.MultipleSelectOptionBackgroundColor)}
      );
      border-radius: var(
        --banana-select-multiple-option-border-radius,
        ${unsafeCSS(Var.MultipleSelectOptionBorderRadius)}
      );
    }

    .select-selector__multiple-option-text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .select-selector__multiple-option-close {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      color: var(--banana-select-multiple-option-close-color, rgba(${unsafeCSS(Colors.Gray5)}));
      transition: all ${unsafeCSS(Var.TransitionFast)} ease;
    }

    .select-selector__multiple-option-close:hover {
      color: var(--banana-select-multiple-option-close-hover-color, rgba(${unsafeCSS(Colors.Gray9)}));
    }
  `,
];
