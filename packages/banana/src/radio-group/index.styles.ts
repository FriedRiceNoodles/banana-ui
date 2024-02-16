import { css, unsafeCSS } from 'lit';
import componentStyles from '../../styles/components.styles';
import { Variables as Var } from '../../styles/global-variables';

export default [
  componentStyles,
  css`
    :host {
      display: flex;
    }

    :host([disabled]) {
      opacity: 0.5;
      cursor: not-allowed;
    }

    :host([disabled]) ::slotted(b-radio),
    :host([readonly]) ::slotted(b-radio) {
      pointer-events: none;
    }

    .radio-group {
      position: relative;
    }

    .radio-group--vertical {
      display: flex;
      flex-direction: column;
      gap: var(--banana-radio-group-vertical-gap, ${unsafeCSS(Var.RadioGroupVerticalGap)});
    }

    .radio-group__validation-input {
      position: absolute;
      visibility: hidden;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: -1;
      width: 0;
      height: 0;
    }
  `,
];
