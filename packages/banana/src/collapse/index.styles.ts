import { css, unsafeCSS } from 'lit';
import componentStyles from '../../styles/components.styles';
import { Colors, Variables as Var } from '../../styles/global-variables';

export default [
  componentStyles,
  css`
    .collapse {
      cursor: pointer;
      border: 1px solid rgb(${unsafeCSS(Colors.Gray2)});
      border-radius: ${unsafeCSS(Var.BorderRadiusMedium)};
      transition: all ${unsafeCSS(Var.TransitionFast)};
      overflow: hidden;
      overflow-anchor: none;
    }

    .collapse__header {
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

    .default-expand-icon {
      transition: all ${unsafeCSS(Var.TransitionFast)};
    }

    .collapse--open .default-expand-icon {
      transform: rotate(90deg);
    }
  `,
];
