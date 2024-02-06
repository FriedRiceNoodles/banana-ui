import { css, unsafeCSS } from 'lit';
import componentStyles from '../../styles/components.styles';
import { Fonts, Spacings, Variables as Var } from '../../styles/global-variables';

export default [
  componentStyles,
  css`
    .modal {
      width: var(--banana-modal-width, ${unsafeCSS(Var.ModalWidth)});
      background-color: var(--banana-modal-background-color, ${unsafeCSS(Var.PanelBackgroundColor)});
      border-radius: var(--banana-modal-border-radius, ${unsafeCSS(Var.BorderRadiusMedium)});
      padding: var(--banana-modal-padding, ${unsafeCSS(Var.ModalPadding)});
      font-size: var(--banana-modal-font-size, ${unsafeCSS(Fonts.FontSizeSmall)});
      position: relative;
      max-height: calc(100vh - ${unsafeCSS(Spacings.Spacing3XL)});
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
    }

    .modal__title-default {
      font-size: var(--banana-modal-title-font-size, ${unsafeCSS(Var.ModalTitleFontSize)});
      font-weight: var(--banana-modal-title-font-weight, ${unsafeCSS(Var.ModalTitleFontWeight)});
      margin-bottom: var(--banana-modal-title-margin-bottom, ${unsafeCSS(Spacings.SpacingSmall)});
    }

    .modal__content {
      overflow-y: auto;
    }

    .modal__footer {
      display: flex;
      justify-content: flex-end;
      gap: var(--banana-modal-footer-gap, ${unsafeCSS(Spacings.SpacingSmall)});
      margin-top: var(--banana-modal-footer-margin-top, ${unsafeCSS(Spacings.SpacingSmall)});
    }

    .modal__close {
      position: absolute;
      top: var(--banana-modal-close-top, ${unsafeCSS(Spacings.SpacingSmall)});
      right: var(--banana-modal-close-right, ${unsafeCSS(Spacings.SpacingSmall)});
      cursor: pointer;
      color: var(--banana-modal-close-color, rgba(0, 0, 0, 0.5));
      line-height: 0;
      border-radius: ${unsafeCSS(Var.BorderRadiusSmall)};
      transition: all ${unsafeCSS(Var.TransitionFast)};
      padding: ${unsafeCSS(Spacings.Spacing3XS)};
    }

    .modal__close:hover {
      background-color: var(--banana-modal-close-hover-background-color, rgba(0, 0, 0, 0.1));
      color: var(--banana-modal-close-hover-color, rgba(0, 0, 0, 0.75));
    }
  `,
];
