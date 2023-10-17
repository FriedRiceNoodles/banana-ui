import { css, unsafeCSS } from 'lit';
import componentStyles from '../../styles/components.styles';
import { Variables as Var } from '../../styles/global-variables';

export default [
  componentStyles,
  css`
    :host {
      cursor: pointer;
      display: block;
      border-radius: var(--banana-select-border-radius, ${unsafeCSS(Var.SelectBorderRadius)});
      padding: var(--banana-select-option-padding, ${unsafeCSS(Var.SelectOptionPadding)});
      transition: background ${unsafeCSS(Var.TransitionNormal)} ease;
      user-select: none;
    }

    :host([active]) {
      background-color: var(
        --banana-select-option-hover-background-color,
        ${unsafeCSS(Var.SelectOptionHoverBackgroundColor)}
      );
    }

    :host([selected]) {
      background-color: var(
        --banana-select-option-selected-background-color,
        ${unsafeCSS(Var.SelectOptionSelectedBackgroundColor)}
      );
    }

    :host([disabled]) {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `,
];
