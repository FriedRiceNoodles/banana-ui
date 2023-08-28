import { css, unsafeCSS } from 'lit';
import componentStyles from '../../styles/components.styles';
import { Colors, Variables as Var } from '../../styles/global-variables';

export default [
  componentStyles,
  css`
    .collapse {
      border: 1px solid rgb(${unsafeCSS(Colors.Gray2)});
      border-radius: ${unsafeCSS(Var.BorderRadiusMedium)};
      transition: all ${unsafeCSS(Var.TransitionFast)};
      overflow: hidden;
      overflow-anchor: none;
    }

    .collapse__header {
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--banana-collapse-title-padding, 16px);
    }

    .collapse__body {
      height: 0;
      overflow-y: hidden;
    }

    .collapse__content {
      display: block;
      padding: var(--banana-collapse-content-padding, 16px);
    }

    .collapse--open .collapse__body {
      height: auto;
    }

    .collapse__icon {
      flex-shrink: 0;
    }

    .default-expand-icon {
      transition: all ${unsafeCSS(Var.TransitionFast)};
    }

    .collapse--open .default-expand-icon {
      transform: rotate(90deg);
    }

    /* Disabled */
    .collapse--disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .collapse--disabled .collapse__body {
      height: 0 !important;
    }
  `,
];
