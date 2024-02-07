import { css, unsafeCSS } from 'lit';
import componentStyles from '../../styles/components.styles';
import { Colors, Variables as Var } from '../../styles/global-variables';

export default [
  componentStyles,
  css`
    :host {
      color: rgba(${unsafeCSS(Colors.Red5)});
      line-height: ${unsafeCSS(Var.LineHeightDense)};
      --banana-switch-gap: 2px;
      --banana-color-text: #fff;
      --banana-font-size: 14px;
      --banana-font-family: inherit;
      --banana-switch-width: 44px;
      --banana-switch-height: 22px;
      --banana-switch-background-no-checked: rgba(0, 0, 0, 0.25);
      --banana-switch-background-checked: #4096ff;
      --banana-switch-control-size: 18px;
      --banana-inner-gap: 6px;
    }
    :host([checked]) > .banana-switch {
      background-color: var(--banana-switch-background-checked);
    }
    :host([disabled]) > .banana-switch {
      opacity: 0.6;
      cursor: not-allowed;
    }

    :host(:not([disabled], [checked])) > .banana-switch:hover {
      background-color: rgba(0, 0, 0, 0.45);
    }

    // :host(:not([disabled])) > .banana-switch:active .switch__control {
    //   inset-inline-start: 0;
    //   inset-inline-end: -30%;
    // }

    .banana-switch {
      position: relative;
      box-sizing: border-box;
      margin: 0;
      padding: var(--banana-switch-gap);
      color: var(--banana-color-text);
      font-size: var(--banana-font-size);
      list-style: none;
      font-family: var(--banana-font-family);
      display: inline-flex;
      align-items: center;
      min-width: var(--banana-switch-width);
      height: var(--banana-switch-height);
      vertical-align: middle;
      border: 0;
      border-radius: 100px;
      cursor: pointer;
      transition: all ${unsafeCSS(Var.TransitionNormal)};
      user-select: none;
      background-color: var(--banana-switch-background-no-checked);
    }

    .switch__input {
      position: absolute;
      opacity: 0;
      padding: 0;
      margin: 0;
      pointer-events: none;
    }

    .switch__inner {
      position: relative;
      display: flex;
      align-items: center;
      gap: var(--banana-switch-control-size);
      overflow: hidden;
      height: 100%;
    }

    :host([checked]) .switch__inner {
      padding-inline-start: var(--banana-inner-gap);
      padding-inline-end: calc(var(--banana-switch-control-size) + var(--banana-switch-gap));
    }

    :host(:not([checked])) .switch__inner {
      padding-inline-start: calc(var(--banana-switch-control-size) + var(--banana-switch-gap));
      padding-inline-end: var(--banana-inner-gap);
    }

    .switch__control {
      position: absolute;
      display: inline-block;
      width: var(--banana-switch-control-size);
      height: var(--banana-switch-control-size);
      background: #fff;
      border-radius: calc(var(--banana-switch-control-size) / 2);
      transition: all ${unsafeCSS(Var.TransitionNormal)};
      inset-inline-start: var(--banana-switch-gap);
    }

    :host([checked]) .switch__control {
      inset-inline-start: calc(100% - calc(var(--banana-switch-control-size) + var(--banana-switch-gap)));
    }

    :host([checked]) .switch__inner-checked {
      display: block;
    }

    :host(:not([checked])) .switch__inner-checked {
      display: none;
    }

    :host([checked]) .switch__inner-unchecked {
      display: none;
    }

    :host(:not([checked])) .switch__inner-unchecked {
      display: block;
    }
  `,
];
