import { css, unsafeCSS } from 'lit';
import componentStyles from '../../styles/components.styles';
import { Colors, Variables as Var } from '../../styles/global-variables';

export default [
  componentStyles,
  css`
    :host {
      line-height: ${unsafeCSS(Var.LineHeightDense)};
      cursor: pointer;
      --banana-tab-nav-color: rgba(${unsafeCSS(Colors.Gray9)});
      --banana-tab-nav-color-hover: rgba(${unsafeCSS(Colors.Blue3)});
      --banana-tab-nav-color-active: rgba(${unsafeCSS(Colors.Blue3)});
      --banana-tab-item-vertical-padding: 16px;
      --banana-tab-item-horizontal-padding: 20px;
    }
    .tab-item {
      display: inline-flex;
      align-items: center;
      padding: var(--banana-tab-item-vertical-padding) var(--banana-tab-item-horizontal-padding);
      color: var(--banana-tab-nav-color);
      transition: all ease-in-out ${unsafeCSS(Var.TransitionNormal)};
    }
    .tab-item:hover:not(.tab-item--disabled) {
      color: var(--banana-tab-nav-color-hover);
    }
    .tab-item--active {
      color: var(--banana-tab-nav-color-active);
    }
    .tab-item--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `,
];
