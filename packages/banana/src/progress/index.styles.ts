import { css, unsafeCSS } from 'lit';
import componentStyles from '../../styles/components.styles';
import { Colors, Variables as Var } from '../../styles/global-variables';

export default [
  componentStyles,
  css`
    :host {
      margin: 10px 0;
      display: block;
      width: 100%;
    }

    .progress {
      position: relative;
      height: var(--banana-progress-height, 10px);
      background: var(--banana-progress-background-color, rgb(${unsafeCSS(Colors.Gray1)}));
      border-radius: var(--banana-progress-border-radius, calc(var(--banana-progress-height, 10px) / 2));
      overflow: hidden;
    }

    .progress-bar {
      position: absolute;
      top: 0;
      left: 0;
      width: var(--banana-progress-percent, 0%);
      height: 100%;
      border-radius: var(--banana-progress-border-radius, calc(var(--banana-progress-height, 10px) / 2));
      background: var(--banana-progress-color, ${unsafeCSS(Var.ColorPrimary)});
      transition: width var(--banana-progress-transition-duration, ${unsafeCSS(Var.TransitionSlow)}) ease;
    }
  `,
];
