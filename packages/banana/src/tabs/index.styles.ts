import { css, unsafeCSS } from 'lit';
import componentStyles from '../../styles/components.styles';
import { Colors, Variables as Var } from '../../styles/global-variables';

export default [
  componentStyles,
  css`
    :host {
      line-height: ${unsafeCSS(Var.LineHeightDense)};
      --banana-tab-nav-divider-color: rgba(${unsafeCSS(Colors.Gray1)});
      --banana-tab-nav-divider-size: 2px;
      --banana-tab-underlined-color: rgba(${unsafeCSS(Colors.Blue3)});
      --banana-tab-underlined-size: 2px;
      --banana-tab-block-radius: 5px;
      --banana-tab-block-active-color: #fff;
    }
    .tab {
      display: flex;
    }

    .tab-pos--top {
      flex-direction: column;
    }

    .tab-pos--bottom {
      flex-direction: column-reverse;
    }

    .tab-pos--left {
      flex-direction: row;
    }

    .tab-pos--right {
      flex-direction: row-reverse;
    }
    .tab__container {
      position: relative;
    }

    .tab__nav {
      align-items: center;
      display: flex;
      scrollbar-width: none;
    }

    .tab-pos--top .tab__nav,
    .tab-pos--bottom .tab__nav {
      overflow-x: auto;
    }

    .tab-pos--left .tab__nav,
    .tab-pos--right .tab__nav {
      overflow-y: auto;
    }

    .tab-pos--top:not(.tab-type--block) .tab__nav-wrapper {
      border-bottom: var(--banana-tab-nav-divider-size) solid var(--banana-tab-nav-divider-color);
    }

    .tab-pos--bottom:not(.tab-type--block) .tab__nav-wrapper {
      border-top: var(--banana-tab-nav-divider-size) solid var(--banana-tab-nav-divider-color);
    }

    .tab-pos--left:not(.tab-type--block) .tab__nav-wrapper {
      border-right: var(--banana-tab-nav-divider-size) solid var(--banana-tab-nav-divider-color);
    }

    .tab-pos--right:not(.tab-type--block) .tab__nav-wrapper {
      border-left: var(--banana-tab-nav-divider-size) solid var(--banana-tab-nav-divider-color);
    }

    .tab__nav-wrapper {
      position: relative;
      display: flex;
      flex: 1;
    }

    .tab-pos--top div[part='nav-list'],
    .tab-pos--bottom div[part='nav-list'] {
      flex-direction: row;
    }

    .tab-pos--left div[part='nav-list'],
    .tab-pos--right div[part='nav-list'] {
      flex-direction: column;
    }

    .tabs__underlined {
      position: absolute;
      background: var(--banana-tab-underlined-color);
      transition: all ease ${unsafeCSS(Var.TransitionFast)};
    }

    .tab-pos--top div[part='active-tab-underlined'] {
      bottom: calc(-1 * var(--banana-tab-nav-divider-size));
      height: var(--banana-tab-underlined-size);
    }

    .tab-pos--bottom div[part='active-tab-underlined'] {
      top: calc(-1 * var(--banana-tab-nav-divider-size));
      height: var(--banana-tab-underlined-size);
    }

    .tab-pos--left div[part='active-tab-underlined'] {
      right: calc(-1 * var(--banana-tab-nav-divider-size));
      width: var(--banana-tab-underlined-size);
    }

    .tab-pos--right div[part='active-tab-underlined'] {
      left: calc(-1 * var(--banana-tab-nav-divider-size));
      width: var(--banana-tab-underlined-size);
    }

    .tab slot[name='body'] {
      display: block;
      flex: 1;
      overflow: auto;
    }
    .tab-pos--top slot[name='body'],
    .tab-pos--bottom slot[name='body'] {
      --banana-tab-panel-padding: 20px 0;
    }

    .tab-pos--left slot[name='body'],
    .tab-pos--right slot[name='body'] {
      --banana-tab-panel-padding: 0 20px;
    }

    .tab-type--block ::slotted(b-tab-item[slot='nav']) {
      border: var(--banana-tab-nav-divider-size) solid var(--banana-tab-nav-divider-color);
    }

    .tab-type--block ::slotted(b-tab-item[slot='nav'][active]) {
      background-color: var(--banana-tab-block-active-color);
    }

    .tab-type--block ::slotted(b-tab-item[slot='nav']:not([active])) {
      background-color: var(--banana-tab-nav-divider-color);
    }
  `,
];
