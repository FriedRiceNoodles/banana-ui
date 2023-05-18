import { css, unsafeCSS } from 'lit';
import componentStyles from '../../styles/components.styles';
import { Variables as Var } from '../../styles/global-variables';

export default [
  componentStyles,
  css`
    :host(:not([vertical])) {
      display: block;
      border-top: solid var(--banana-divider-width, ${unsafeCSS(Var.DividerWidth)}) var(--banana-divider-color, rgb(${unsafeCSS(Var.DividerColor)}));
      margin: var(--banana-divider-spacing, ${unsafeCSS(Var.DividerSpacing)}) 0;
    }

    :host([vertical]) {
      display: inline-block;
      height: 100%;
      border-left: solid var(--banana-divider-width, ${unsafeCSS(Var.DividerWidth)}) var(--banana-divider-color, rgb(${unsafeCSS(Var.DividerColor)}));
      margin: 0 var(--banana-divider-spacing, ${unsafeCSS(Var.DividerSpacing)});
    }

    :host([dashed]:not([vertical])) {
      border-top-style: dashed;
    }

    :host([dashed][vertical]) {
      border-left-style: dashed;
    }
  `,
];
