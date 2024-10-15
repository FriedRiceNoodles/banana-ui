import { css, unsafeCSS } from 'lit';
import componentStyles from '../../styles/components.styles';
import { Variables as Var } from '../../styles/global-variables';

export default [
  componentStyles,
  css`
    :host {
      line-height: ${unsafeCSS(Var.LineHeightDense)};
      display: none;
    }
    :host([active]) {
      display: block;
    }
    .panel_container {
      padding: var(--banana-tab-panel-padding);
    }
  `,
];
