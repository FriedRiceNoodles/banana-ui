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
      position: absolute;
      opacity: 0;
      overflow-y: scroll;
      z-index: 100;
    }

    .dropdown--open .dropdown__content {
    }

    [placement='bottomLeft' i] .dropdown__content,
    [placement='topLeft' i] .dropdown__content {
      left: 0;
    }

    [placement='bottom' i] .dropdown__content,
    [placement='top' i] .dropdown__content {
      left: 50%;
      transform: translateX(-50%);
    }

    [placement='bottomRight' i] .dropdown__content,
    [placement='topRight' i] .dropdown__content {
      right: 0;
    }
  `,
];
