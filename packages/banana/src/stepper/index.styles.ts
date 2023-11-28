import { css, unsafeCSS } from 'lit';
import componentStyles from '../../styles/components.styles';
import { Colors, Variables as Var } from '../../styles/global-variables';

/**
 * --banana-stepper-border-width: step container border width
 * --banana-stepper-border-color: step container border color
 * --banana-stepper-border-color-focus: step container border color when focused
 * --banana-stepper-btn-background-color: step button background color
 * --banana-stepper-content-color: step content font color
 * --banana-stepper-font-size: step content font size
 * --banana-stepper-font-family: step content font family
 * --banana-stepper-content-weight: step content font weight
 */

export default [
  componentStyles,
  css`
    :host {
      color: rgba(${unsafeCSS(Colors.Red5)});
      line-height: ${unsafeCSS(Var.LineHeightDense)};
      display: block;
      width: fit-content;
    }

    .stepper__container {
      width: fit-content;
      display: flex;
      justify-content: center;
      align-items: center;
      border-width: var(--banana-stepper-border-width, 1px);
      border-color: var(--banana-stepper-border-color, #e5e5e4);
      border-style: solid;
      transition: all ${unsafeCSS(Var.TransitionNormal)} ease-in-out;
    }

    .stepper__container__focus {
      border-color: var(--banana-stepper-border-color-focus, #00897b);
    }

    .stepper__btn {
      width: 38px;
      height: var(--banana-stepper-height, 32px);
      margin: 0;
      padding: 0;
      border-width: 0;
      background-color: var(--banana-stepper-btn-background-color, transparent);

      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .stepper__input {
      width: 38px;
      margin: 0;
      padding: 0;
      border-width: 0;
      text-align: center;
      color: var(--banana-stepper-content-color, #212224);
      font-size: var(--banana-stepper-content-size, 14px);
      font-family: var(--banana-stepper-font-family, inherit);
      font-weight: var(--banana-stepper-content-weight, 500);
    }

    .stepper__input:focus {
      outline: none;
    }

    .disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }

    .input_container {
      width: fit-content;
      height: var(--banana-stepper-height, 32px);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .input__disabled {
      cursor: not-allowed;
      opacity: 0.4;
      pointer-events: none;
    }
  `,
];
