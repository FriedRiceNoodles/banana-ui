import { css, unsafeCSS } from 'lit';
import componentStyles from '../../styles/components.styles';
import { Colors, Spacings, Variables as Var } from '../../styles/global-variables';

export default [
  componentStyles,
  css`
    :host {
      position: relative;
      list-style: none;
    }

    .external-wrapper {
      position: relative;
      overflow: hidden;
      transition: height var(--banana-carousel-transition-duration, ${unsafeCSS(Var.TransitionNormal)});
    }

    .slides-wrapper {
      display: flex;
      transition: transform var(--banana-carousel-transition-duration, ${unsafeCSS(Var.TransitionNormal)});
      gap: calc(var(--banana-carousel-gap, 0) * 1px);
    }

    .slides-wrapper.no-transition {
      transition-duration: 0ms;
    }

    .slides-wrapper ::slotted(*) {
      flex-basis: calc((100% - (var(--banana-carousel-slidesPerView) - 1) * var(--banana-carousel-gap) * 1px) / var(--banana-carousel-slidesPerView));
      flex-grow: 0;
      flex-shrink: 0;
    }

    .navigation-buttons {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      margin: 0;
      padding: 0;
      border: none;
      outline: none;
      background-color: transparent;
      cursor: pointer;
      transition: background ${unsafeCSS(Var.TransitionNormal)};
      z-index: 1;
    }

    .navigation-button--disabled {
      opacity: 0.4;
      cursor: default;
    }

    .navigation-buttons:not(.navigation-button--disabled):hover {
      background-color: rgba(${unsafeCSS(Colors.Gray2)}, 0.5);
    }

    .navigation-button--previous {
      left: 10px;
    }

    .navigation-button--next {
      right: 10px;
    }

    .default-prev-icon,
    .default-next-icon {
      width: 24px;
      height: 24px;
      padding: ${unsafeCSS(Spacings.Spacing3XS)};
      box-sizing: content-box;
    }
  `,
];
