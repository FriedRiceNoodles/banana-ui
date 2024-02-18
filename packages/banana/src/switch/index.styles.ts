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
      --banana-switch-background-no-checked-hover: rgba(0, 0, 0, 0.45);
      --banana-switch-background-checked: #1677ff;
      --banana-switch-control-size: 18px;
      --banana-inner-gap: 4px;
    }
    :host([checked]) > .banana-switch {
      background-color: var(--banana-switch-background-checked);
    }
    :host([disabled]) > .banana-switch {
      opacity: 0.6;
      cursor: not-allowed;
    }

    :host(:not([disabled], [checked])) > .banana-switch:hover {
      background-color: var(--banana-switch-background-no-checked-hover);
    }

    // :host([checked]) > .banana-switch:hover {
    //   background-color: #4096ff;
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
      overflow: hidden;
      height: 100%;
      width: calc(var(--banana-inner-width) + var(--banana-switch-control-size) + var(--banana-inner-gap) * 2);
      white-space: nowrap;
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

    .switch__inner-wrapper {
      display: inline-block;
      width: 100%;
      text-align: center;
      transition: all ${unsafeCSS(Var.TransitionNormal)};
    }

    :host(:not([checked])) .switch__checked-offset {
      translate: calc(-100% - var(--banana-inner-gap) - var(--banana-switch-control-size));
    }
    :host([checked]) .switch__checked-offset {
      translate: 0;
    }

    :host(:not([checked])) .switch__unchecked-offset {
      translate: calc(-100% - var(--banana-inner-gap));
    }

    :host([checked]) .switch__unchecked-offset {
      translate: var(--banana-switch-control-size);
    }
  `,
];
