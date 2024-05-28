import { css, unsafeCSS } from 'lit';
import componentStyles from '../../styles/components.styles';
import { Colors, Spacings, Variables as Var } from '../../styles/global-variables';

export default [
  componentStyles,
  css`
    :host {
      position: relative;
      list-style: none;
      display: block;
    }

    .external-wrapper {
      position: relative;
      overflow: hidden;
      /**
       * It may cause a bug of the scrollbar appearing on the right side of the carousel,
       * width of the carousel is calculated based on the width of the external wrapper.
       * If the scrollbar showed after the width calculation, the translation of the slides-wrapper
       * will be incorrect.
       * 
       * If you encounter this problem, you can remove the transition of the height of the external wrapper.
       */
      transition: height var(--banana-carousel-transition-duration, ${unsafeCSS(Var.TransitionNormal)});
    }

    .external-wrapper--vertical {
      height: var(--banana-carousel-vertical-height, 100%);
    }

    .slides-wrapper {
      display: flex;
      transition: transform var(--banana-carousel-transition-duration, ${unsafeCSS(Var.TransitionNormal)});
      /* This variable should not be used directly, use the gap property instead */
      /* DO NOT PUT IT IN THE DOCUMENTATION */
    }
    .slides-wrapper--vertical {
      flex-direction: column;
      height: 100%;
    }

    .slides-wrapper.no-transition {
      transition-duration: 0ms;
    }

    .slides-wrapper--normal ::slotted(*) {
      /* This variable should not be used directly, use the slidesPerView property instead */
      /* DO NOT PUT IT IN THE DOCUMENTATION */
      width: calc(
        (100% - (var(--banana-carousel-slidesPerView) - 1) * var(--banana-carousel-gap) * 1px) /
          var(--banana-carousel-slidesPerView)
      );
      height: 100%;
      flex-grow: 0;
      flex-shrink: 0;
      margin-right: calc(var(--banana-carousel-gap, 0) * 1px);
    }

    .slides-wrapper--vertical ::slotted(*) {
      /* This variable should not be used directly, use the slidesPerView property instead */
      /* DO NOT PUT IT IN THE DOCUMENTATION */
      height: calc(
        (100% - (var(--banana-carousel-slidesPerView) - 1) * var(--banana-carousel-gap) * 1px) /
          var(--banana-carousel-slidesPerView)
      );
      width: 100%;
      flex-grow: 0;
      flex-shrink: 0;
      margin-bottom: calc(var(--banana-carousel-gap, 0) * 1px);
    }

    .navigation-buttons {
      position: absolute;
      margin: 0;
      padding: 0;
      border: none;
      outline: none;
      background-color: transparent;
      cursor: pointer;
      transition: background ${unsafeCSS(Var.TransitionNormal)};
      z-index: 1;
    }

    .navigation-button--normal {
      top: 50%;
      transform: translateY(-50%);
    }

    .navigation-button--vertical {
      left: 50%;
      transform: translateX(-50%) rotate(90deg);
    }

    .navigation-button--disabled {
      opacity: 0.4;
      cursor: default;
    }

    .navigation-buttons:not(.navigation-button--disabled):hover {
      background-color: rgba(${unsafeCSS(Colors.Gray2)}, 0.5);
    }

    .navigation-button--previous__normal {
      left: 10px;
    }
    .navigation-button--previous__vertical {
      top: 10px;
    }

    .navigation-button--next__normal {
      right: 10px;
    }
    .navigation-button--next__vertical {
      bottom: 10px;
    }

    .default-prev-icon,
    .default-next-icon {
      width: 24px;
      height: 24px;
      padding: ${unsafeCSS(Spacings.Spacing3XS)};
      box-sizing: content-box;
    }

    .indicators {
      position: absolute;
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      gap: var(--banana-carousel-indicator-gap, var(--banana-carousel-indicator-size, 8px));
      z-index: 1;
    }

    .indicators--normal {
      bottom: 16px;
      left: 50%;
      transform: translateX(-50%);
    }

    .indicators--vertical {
      right: 16px;
      bottom: 50%;
      transform: translateY(50%);
      flex-direction: column;
    }

    .indicator {
      width: var(--banana-carousel-indicator-size, 8px);
      height: var(--banana-carousel-indicator-size, 8px);
      border-radius: 50%;
      background-color: var(--banana-carousel-indicator-color, rgba(${unsafeCSS(Colors.Gray8)}));
      opacity: 0.5;
      cursor: pointer;
      transition: all ${unsafeCSS(Var.TransitionNormal)};
    }

    .indicator.active,
    .indicator:hover {
      opacity: 1;
    }
  `,
];
