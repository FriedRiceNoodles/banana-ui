import { css, unsafeCSS } from 'lit';
import componentStyles from '../../styles/components.styles';
import { Variables as Var } from '../../styles/global-variables';

export default [
  componentStyles,
  css`
    :host {
      display: inline-block;
      font-size: var(--banana-countdown-font-size, ${unsafeCSS(Var.CountdownFontSize)});
      font-weight: var(--banana-countdown-font-weight, ${unsafeCSS(Var.CountdownFontWeight)});
      color: var(--banana-countdown-color, ${unsafeCSS(Var.CountdownColor)});
    }
  `,
];
