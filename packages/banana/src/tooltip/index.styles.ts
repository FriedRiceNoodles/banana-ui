import { css, unsafeCSS } from 'lit';
import componentStyles from '../../styles/components.styles';
import { Variables as Var } from '../../styles/global-variables';

export default [
  componentStyles,
  css`
    :host {
      display: contents;
    }

    .tooltip {
      display: contents;
    }

    .tooltip__content {
      width: max-content;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      z-index: 100;
    }

    .tooltip__content-body {
      padding: var(--banana-tooltip-padding, ${unsafeCSS(Var.TooltipPadding)});
      background-color: var(--banana-tooltip-background-color, ${unsafeCSS(Var.TooltipBackgroundColor)});
      color: var(--banana-tooltip-color, #fff);
      font-size: var(--banana-tooltip-font-size, ${unsafeCSS(Var.TooltipFontSize)});
      border-radius: var(--banana-tooltip-border-radius, ${unsafeCSS(Var.TooltipBorderRadius)});
      width: max-content;
      max-width: var(--banana-tooltip-max-width, ${unsafeCSS(Var.TooltipMaxWidth)});
    }

    .tooltip__default-arrow {
      position: absolute;
      width: 0;
      height: 0;
      border: 4px solid var(--banana-tooltip-background-color, ${unsafeCSS(Var.TooltipBackgroundColor)});
      rotate: 45deg;
    }
  `,
];
