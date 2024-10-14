import { css, unsafeCSS } from 'lit';
import componentStyles from '../../styles/components.styles';
import { Variables as Var } from '../../styles/global-variables';

export default [
  componentStyles,
  css`
    :host {
      line-height: var(--banana-marquee-line-height, ${unsafeCSS(Var.LineHeightDenser)});
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
      display: inline-block;
      flex-shrink: 0;
      white-space: nowrap;
      height: var(
        --banana-marquee-height,
        calc(var(--banana-marquee-line-height, ${unsafeCSS(Var.LineHeightDenser)}) * 1em)
      );
    }

    .content:not(.content-fixed) {
      animation: marquee-horizontal var(--banana-marquee-duration) linear infinite;
    }

    .content-vertical:not(.content-fixed) {
      animation: marquee-vertical var(--banana-marquee-duration) linear infinite;
    }

    .content-vertical {
      flex-shrink: unset;
      white-space: normal;
    }

    @media (any-hover: hover) {
      .marquee--pause-when-hover:hover .content {
        animation-play-state: paused;
      }
    }

    @keyframes marquee-horizontal {
      0% {
        transform: translateX(var(--banana-marquee-width));
      }

      100% {
        transform: translateX(-100%);
      }
    }

    @keyframes marquee-vertical {
      0% {
        transform: translateY(var(--banana-marquee-height));
      }

      100% {
        transform: translateY(-100%);
      }
    }
  `,
];
