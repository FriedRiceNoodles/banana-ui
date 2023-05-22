import { css, unsafeCSS } from 'lit';
import componentStyles from '../../styles/components.styles';
import { Colors, Fonts, Spacings, Variables as Var } from '../../styles/global-variables';

export default [
  componentStyles,
  css`
    :host {
      display: block;
    }

    :host(:hover:not([aria-disabled='true'])) .menu-item {
      background-color: var(--banana-menu-item-hover-background, rgba(${unsafeCSS(Colors.Gray1)}, 0.75));
    }

    .menu-item {
      position: relative;
      display: flex;
      align-items: stretch;
      font-size: var(--banana-menu-item-font-size, ${unsafeCSS(Fonts.FontSizeMedium)});
      line-height: ${unsafeCSS(Var.LineHeightNormal)};
      padding: var(--banana-menu-item-padding, ${unsafeCSS(Spacings.Spacing2XS)} ${unsafeCSS(Spacings.SpacingXL)});
      color: var(--banana-menu-item-color, rgba(${unsafeCSS(Colors.Gray9)}, 1));
      user-select: none;
      white-space: nowrap;
      cursor: pointer;
    }

    .menu-item.menu-item--disabled {
      outline: none;
      opacity: 0.5;
      cursor: not-allowed;
    }

    .menu-item .menu-item__label {
      flex: 1 1 auto;
      display: inline-block;
    }
  `,
];
