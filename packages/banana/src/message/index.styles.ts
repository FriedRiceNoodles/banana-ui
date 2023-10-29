import { css, unsafeCSS } from 'lit';
import componentStyles from '../../styles/components.styles';
import { Colors, Fonts, Spacings, Variables as Var } from '../../styles/global-variables';

export default [
  componentStyles,
  css`
    :host {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 999;
    }

    .messages__box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--banana-message-box-gap, ${unsafeCSS(Spacings.SpacingSmall)});
    }

    .message {
      color: var(--banana-message-content-color);
      padding: var(--banana-message-padding, ${unsafeCSS(Spacings.SpacingXS)} ${unsafeCSS(Spacings.SpacingSmall)});
      border-radius: var(--banana-message-border-radius, ${unsafeCSS(Var.BorderRadiusMedium)});
      box-shadow: var(--banana-message-box-shadow, 0 0 1px rgba(0, 0, 0, 0.3), 0 4px 14px rgba(0, 0, 0, 0.1));
      display: flex;
      align-items: center;
      gap: var(--banana-message-gap, ${unsafeCSS(Spacings.SpacingXS)});
      animation: message__fade-in var(--banana-message-animation-duration, 0.2s) ease-in-out;
      background-color: var(--banana-message-background-color, #fff);
    }

    /* Todo: fade-out */
    @keyframes message__fade-in {
      from {
        opacity: 0;
        transform: translateY(-100%);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .message__icon {
      line-height: 0;
    }

    .message--info .message__icon {
      color: rgb(${unsafeCSS(Colors.Blue6)});
    }

    .message--success .message__icon {
      color: ${unsafeCSS(Var.ColorSuccess)};
    }

    .message--warning .message__icon {
      color: ${unsafeCSS(Var.ColorWarning)};
    }

    .message--error .message__icon {
      color: ${unsafeCSS(Var.ColorDanger)};
    }

    .message--loading .message__icon {
      color: ${unsafeCSS(Var.ColorPrimary)};
      animation: loading var(--banana-message-loading-speed, 1s) linear infinite;
    }

    @keyframes loading {
      0% {
        transform: rotate(0deg);
      }

      50% {
        transform: rotate(180deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }

    .message__content {
      font-size: var(--banana-message-content-font-size, ${unsafeCSS(Fonts.FontSizeSmall)});
      font-weight: var(--banana-message-content-font-weight, ${unsafeCSS(Fonts.FontWeightSemibold)});
    }
  `,
];
