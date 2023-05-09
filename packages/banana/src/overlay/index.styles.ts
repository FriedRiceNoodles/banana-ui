import { css, unsafeCSS } from 'lit';
import componentStyles from '../../styles/components.styles';
import { Colors, Variables as Var } from '../../styles/global-variables';

export default [
  componentStyles,
  css`
    :host {
      position: fixed;
      display: flex;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      background: var(--overlay-background, rgba(0, 0, 0, 0.7));
      visibility: hidden;
      opacity: 0;
      transition: all 0.3s;
    }

    :host([open]) {
      opacity: 1;
      z-index: var(--overlay-z-index, 999);
      visibility: visible;
    }

    :host .banana-overlay-mask {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: transparent;
      z-index: -1;
    }

    :host .banana-overlay {
      position: relative;
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `,
];
