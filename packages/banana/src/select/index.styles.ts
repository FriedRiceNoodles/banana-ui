import { css, unsafeCSS } from 'lit';
import componentStyles from '../../styles/components.styles';
import { Variables as Var } from '../../styles/global-variables';

export default [
  componentStyles,
  css`
    :host {
      display: inline-block;
      min-width: 120px;
    }

    .select {
      position: relative;
    }

    .default-expand-icon {
      margin-left: 4px;
      transform: rotate(90deg);
    }

    .select__selector-trigger {
      display: flex;
    }

    .select__selector-trigger::part(base) {
      display: flex;
      justify-content: space-between;
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
