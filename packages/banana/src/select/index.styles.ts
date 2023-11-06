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

    :host(:focus-visible) {
      outline: none;
    }

    .select {
      position: relative;
    }

    .select__validation-input {
      position: absolute;
      visibility: hidden;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: -1;
      width: 0;
      height: 0;
    }

    .select__selector {
      border: var(--banana-select-selector-border, ${unsafeCSS(Var.SelectCommonGray)} solid 1px);
      box-sizing: border-box;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: all ${unsafeCSS(Var.TransitionFast)} ease;
      user-select: none;
      position: relative;
    }

    .select__selector--small {
      font-size: var(--banana-select-selector-font-size-small, ${unsafeCSS(Var.SelectorFontSizeSmall)});
      min-height: var(--banana-select-selector-height-small, ${unsafeCSS(Var.SelectorHeightSmall)});
      padding: var(--banana-select-selector-padding-small, ${unsafeCSS(Var.SelectorPaddingSmall)});
      border-radius: var(--banana-select-selector-border-radius-small, ${unsafeCSS(Var.SelectorBorderRadiusSmall)});
    }

    .select__selector--medium {
      font-size: var(--banana-select-selector-font-size-medium, ${unsafeCSS(Var.SelectorFontSizeMedium)});
      min-height: var(--banana-select-selector-height-medium, ${unsafeCSS(Var.SelectorHeightMedium)});
      padding: var(--banana-select-selector-padding-medium, ${unsafeCSS(Var.SelectorPaddingMedium)});
      border-radius: var(--banana-select-selector-border-radius-medium, ${unsafeCSS(Var.SelectorBorderRadiusMedium)});
    }

    .select__selector--large {
      font-size: var(--banana-select-selector-font-size-large, ${unsafeCSS(Var.SelectorFontSizeLarge)});
      min-height: var(--banana-select-selector-height-large, ${unsafeCSS(Var.SelectorHeightLarge)});
      padding: var(--banana-select-selector-padding-large, ${unsafeCSS(Var.SelectorPaddingLarge)});
      border-radius: var(--banana-select-selector-border-radius-large, ${unsafeCSS(Var.SelectorBorderRadiusLarge)});
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

    .select__selector-icon {
      position: absolute;
      right: 8px;
      top: 50%;
      margin-left: 4px;
      flex-shrink: 0;
      transform: translateY(-50%);
      transition: all ${unsafeCSS(Var.TransitionNormal)} ease;
    }

    .default-expand-icon {
      transform: translateY(-50%) rotate(90deg);
      color: var(--banana-select-expand-icon-color, ${unsafeCSS(Var.SelectCommonGray)});
    }

    .clear-icon {
      visibility: hidden;
      opacity: 0;
      color: var(--banana-select-clear-icon-color, ${unsafeCSS(Var.SelectIconColor)});
    }

    .clear-icon:hover {
      color: var(--banana-select-clear-icon-hover-color, ${unsafeCSS(Var.SelectIconHoverColor)});
    }

    .select__selector--clearable:hover .default-expand-icon {
      visibility: hidden;
      opacity: 0;
    }

    .select__selector--clearable:hover .clear-icon {
      visibility: visible;
      opacity: 1;
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
      border-radius: var(--banana-select-border-radius, ${unsafeCSS(Var.SelectListBorderRadius)});
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
      padding: 2px 0;
    }

    .select-selector__multiple-option {
      display: flex;
      gap: 4px;
      max-width: 100%;
      box-sizing: border-box;
      padding: 0 6px;
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

    .select__selector--small .select-selector__multiple-option {
      height: var(--banana-select-multiple-option-height-small, ${unsafeCSS(Var.MultipleSelectOptionHeightSmall)});
      line-height: var(--banana-select-multiple-option-height-small, ${unsafeCSS(Var.MultipleSelectOptionHeightSmall)});
    }

    .select__selector--medium .select-selector__multiple-option {
      height: var(--banana-select-multiple-option-height-medium, ${unsafeCSS(Var.MultipleSelectOptionHeightMedium)});
      line-height: var(
        --banana-select-multiple-option-height-medium,
        ${unsafeCSS(Var.MultipleSelectOptionHeightMedium)}
      );
    }

    .select__selector--large .select-selector__multiple-option {
      height: var(--banana-select-multiple-option-height-large, ${unsafeCSS(Var.MultipleSelectOptionHeightLarge)});
      line-height: var(--banana-select-multiple-option-height-large, ${unsafeCSS(Var.MultipleSelectOptionHeightLarge)});
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
      color: var(--banana-select-multiple-option-close-color, ${unsafeCSS(Var.SelectIconColor)});
      transition: all ${unsafeCSS(Var.TransitionFast)} ease;
    }

    .select-selector__multiple-option-close:hover {
      color: var(--banana-select-multiple-option-close-hover-color, ${unsafeCSS(Var.SelectIconHoverColor)});
    }
  `,
];
