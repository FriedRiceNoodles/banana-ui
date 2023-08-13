import { css, unsafeCSS } from 'lit';
import componentStyles from '../../styles/components.styles';
import { Spacings, Variables as Var } from '../../styles/global-variables';

export default [
  componentStyles,
  css`
    :host {
      display: block;
      position: relative;
      background: var(--banana-menu-background, ${unsafeCSS(Var.PanelBackgroundColor)});
      border: var(--banana-menu-border, solid ${unsafeCSS(Var.PanelBorderWidth)} ${unsafeCSS(Var.PanelBorderColor)});
      border-radius: ${unsafeCSS(Var.BorderRadiusMedium)};
      padding: var(--banana-menu-padding, ${unsafeCSS(Spacings.Spacing2XS)} 0);
      overflow: auto;
      overscroll-behavior: none;
    }

    ::slotted(b-divider) {
      --banana-divider-spacing: ${unsafeCSS(Spacings.SpacingXS)};
    }
  `,
];
