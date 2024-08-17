import { css, unsafeCSS } from 'lit';
import componentStyles from '../../styles/components.styles';
import { Variables as Var } from '../../styles/global-variables';

export default [
  componentStyles,
  css`
    :host {
      line-height: var(--banana-marquee-line-height, ${unsafeCSS(Var.LineHeightDense)});
      color: var(--banana-marquee-color);
      font-size: var(--banana-marquee-font-size);
      overflow: hidden;
    }

    .marquee {
      overflow: hidden;
      background-color: var(--banana-marquee-background-color);
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .content {
      overflow: hidden;
      display: inline-block;
      flex: 0 0 auto;
      white-space: nowrap;
    }

    .content-normal {
      animation: marquee var(--banana-marquee-duration) linear infinite;
    }

    .content-fixed {
      transform: translateX(0);
    }

    @media (any-hover: hover) {
      .marquee--pause-when-hover:hover .content {
        animation-play-state: paused;
      }
    }

    @keyframes marquee {
      0% {
        transform: translateX(var(--banana-marquee-width));
      }

      100% {
        transform: translateX(-100%);
      }
    }
  `,
];
