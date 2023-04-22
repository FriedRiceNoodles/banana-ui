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
    }

    .collapse__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--banana-collapse-title-padding, 16px);
    }

    .collapse__body {
      opacity: 0;
      height: 0;
    }

    .collapse__content {
      display: none;
      padding: var(--banana-collapse-content-padding, 16px);
    }

    .collapse--open .collapse__body {
      opacity: 1;
      height: auto;
      overflow: hidden;
    }

    .collapse--open .collapse__content {
      display: block;
    }

    .default-expand-icon {
      transition: all ${unsafeCSS(Var.TransitionFast)};
    }

    .collapse--open .default-expand-icon {
      transform: rotate(90deg);
    }
  `,
];
