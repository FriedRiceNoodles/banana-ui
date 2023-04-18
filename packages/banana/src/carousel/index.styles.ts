import { css, unsafeCSS } from 'lit';
import componentStyles from '../../styles/components.styles';
import { Colors, Variables as Var } from '../../styles/global-variables';

export default [
  componentStyles,
  css`
    :host {
      position: relative;
      list-style: none;
    }

    .external-wrapper {
      overflow: hidden;
    }

    .slides-wrapper {
      display: flex;
      transition: transform var(--banana-carousel-transition-duration, ${unsafeCSS(Var.TransitionNormal)});
    }

    .slides-wrapper.no-transition {
      background-color: red;
      transition-duration: 0ms;
    }

    .slides-wrapper ::slotted(*) {
      flex-basis: 100%;
      flex-grow: 0;
      flex-shrink: 0;
    }
  `,
];
