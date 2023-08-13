import { css, unsafeCSS } from 'lit';
import componentStyles from '../../styles/components.styles';
import { Variables as Var } from '../../styles/global-variables';

export default [
  componentStyles,
  css`
    .inside-overlay::part(container) {
      position: static;
      margin: 0;
      display: block;
    }

    .popup__container {
      position: absolute;
      background-color: #fff;
      transition: transform ${unsafeCSS(Var.TransitionNormal)};
    }

    .popup__container.popup--open {
      transform: translate3d(0, 0, 0) !important;
    }

    .popup__container.popup--top {
      top: 0;
      right: 0;
      left: 0;
      transform: translate3d(0, -100%, 0);
      overflow-y: scroll;
    }

    .popup__container.popup--right {
      top: 0;
      right: 0;
      bottom: 0;
      transform: translate3d(100%, 0, 0);
      overflow-x: scroll;
    }

    .popup__container.popup--bottom {
      right: 0;
      bottom: 0;
      left: 0;
      transform: translate3d(0, 100%, 0);
      overflow-y: scroll;
    }

    .popup__container.popup--left {
      top: 0;
      bottom: 0;
      left: 0;
      transform: translate3d(-100%, 0, 0);
      overflow-x: scroll;
    }
  `,
];
