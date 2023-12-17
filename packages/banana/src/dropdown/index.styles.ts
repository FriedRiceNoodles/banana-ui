import { css } from 'lit';
import componentStyles from '../../styles/components.styles';

export default [
  componentStyles,
  css`
    :host {
      display: contents;
    }

    .dropdown {
      display: contents;
    }

    .dropdown__content {
      width: max-content;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      z-index: 100;
    }
  `,
];
