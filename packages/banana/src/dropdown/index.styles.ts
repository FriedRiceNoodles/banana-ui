import { css, unsafeCSS } from 'lit';
import componentStyles from '../../styles/components.styles';
import { Variables as Var } from '../../styles/global-variables';

export default [
  componentStyles,
  css`
    :host {
      display: inline-block;
      position: relative;
    }

    .dropdown__content {
      visibility: hidden;
      position: absolute;
      opacity: 0;
      overflow-y: scroll;
      z-index: 100;
      transition: all ${unsafeCSS(Var.TransitionNormal)};
    }

    .dropdown--open .dropdown__content {
      visibility: visible;
      opacity: 1;
    }
  `,
];
