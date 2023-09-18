import { css, unsafeCSS } from 'lit';
import componentStyles from '../../styles/components.styles';
import { Colors, Spacings, Variables as Var } from '../../styles/global-variables';

export default [
  componentStyles,
  css`
    :host {
      --banana-rating-symbol-color: rgb(${unsafeCSS(Colors.Orange4)});
      --banana-rating-symbol-background-color: rgb(${unsafeCSS(Colors.Gray3)});
      --banana-rating-symbol-size: 24px;
      --banana-rating-symbol-spacing: ${unsafeCSS(Spacings.SpacingXS)};
      line-height: 1;
    }

    .rating__symbols {
      display: inline-flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: var(--banana-rating-symbol-spacing);
      font-size: var(--banana-rating-symbol-size);
    }

    .rating__symbol-container {
      cursor: pointer;
      transition: all var(--banana-rating-transition-duration, ${unsafeCSS(Var.TransitionFast)});
      position: relative;
    }

    .rating__symbol-container:focus,
    .rating__symbol-container:hover {
      transform: scale(1.2);
    }

    .rating__symbol svg {
      display: block;
      width: 1em;
      height: 1em;
      fill: currentColor;
    }

    .rating__symbol-active {
      color: var(--banana-rating-symbol-color);
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;
      width: 0;
      z-index: 1;
    }

    .rating__symbol-active--full {
      width: 100%;
    }

    .rating__symbol-active--half {
      width: 50%;
    }

    .rating__symbol-background {
      color: var(--banana-rating-symbol-background-color);
    }

    .rating--readonly .rating__symbol-container,
    .rating--disabled .rating__symbol-container {
      pointer-events: none;
    }

    .rating--disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  `,
];
