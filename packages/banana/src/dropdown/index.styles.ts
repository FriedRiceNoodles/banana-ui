import { css, unsafeCSS } from 'lit';
import componentStyles from '../../styles/components.styles';
import { Variables as Var } from '../../styles/global-variables';

export default [
  componentStyles,
  css`
    :host {
      display: inline-block;
    }

    .dropdown__content {
      width: max-content;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      z-index: 100;
    }

    .dropdown--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .dropdown--disabled .dropdown__trigger,
    .dropdown--disabled .dropdown__content {
      pointer-events: none;
    }
  `,
];
