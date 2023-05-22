import { css, unsafeCSS } from 'lit';
import componentStyles from '../../styles/components.styles';
import { Spacings, Variables as Var } from '../../styles/global-variables';

export default [
  componentStyles,
  css`
    :host(:not([vertical])) {
      display: block;
      border-top: solid var(--banana-divider-width, ${unsafeCSS(Var.PanelBorderWidth)}) var(--banana-divider-color, ${unsafeCSS(Var.PanelBorderColor)});
      margin: var(--banana-divider-spacing, ${unsafeCSS(Spacings.SpacingMedium)}) 0;
    }

    :host([vertical]) {
      display: inline-block;
      height: 100%;
      border-left: solid var(--banana-divider-width, ${unsafeCSS(Var.PanelBorderWidth)}) var(--banana-divider-color, ${unsafeCSS(Var.PanelBorderColor)});
      margin: 0 var(--banana-divider-spacing, ${unsafeCSS(Spacings.SpacingMedium)});
    }

    :host([dashed]:not([vertical])) {
      border-top-style: dashed;
    }

    :host([dashed][vertical]) {
      border-left-style: dashed;
    }
  `,
];
