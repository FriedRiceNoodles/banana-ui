import { css, unsafeCSS } from 'lit';
import componentStyles from '../../styles/components.styles';
import { Colors, Variables as Var } from '../../styles/global-variables';

export default [
  componentStyles,
  css`
    :host {
      line-height: ${unsafeCSS(Var.LineHeightDense)};
      --banana-tab-height: auto;
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
      height: var(--banana-tab-height);
      flex-direction: row;
    }

    .tab-pos--right {
      height: var(--banana-tab-height);
      flex-direction: row-reverse;
    }
    .tab__container {
      position: relative;
    }

    .tab__nav {
      position: relative;
      align-items: center;
      display: flex;
    }

    .tab-pos--left .tab__nav,
    .tab-pos--right .tab__nav {
      height: 100%;
    }

    .tab-pos--top:not(.tab-type--block) .tab__nav::before {
      content: '';
      position: absolute;
      bottom: 0;
      width: 100%;
      border-bottom: var(--banana-tab-nav-divider-size) solid var(--banana-tab-nav-divider-color);
    }

    .tab-pos--bottom:not(.tab-type--block) .tab__nav::before {
      content: '';
      position: absolute;
      top: 0;
      width: 100%;
      border-top: var(--banana-tab-nav-divider-size) solid var(--banana-tab-nav-divider-color);
    }

    .tab-pos--left:not(.tab-type--block) .tab__nav::before {
      content: '';
      position: absolute;
      right: 0;
      height: 100%;
      border-right: var(--banana-tab-nav-divider-size) solid var(--banana-tab-nav-divider-color);
    }

    .tab-pos--right:not(.tab-type--block) .tab__nav::before {
      content: '';
      position: absolute;
      left: 0;
      height: 100%;
      border-left: var(--banana-tab-nav-divider-size) solid var(--banana-tab-nav-divider-color);
    }

    .tab-pos--top .tab__nav-list,
    .tab-pos--bottom .tab__nav-list {
      overflow-x: auto;
      scrollbar-width: none;
    }

    .tab-pos--left .tab__nav-list,
    .tab-pos--right .tab__nav-list {
      overflow-y: auto;
      scrollbar-width: none;
      height: 100%;
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
      bottom: 0;
      height: var(--banana-tab-underlined-size);
    }

    .tab-pos--bottom div[part='active-tab-underlined'] {
      top: 0;
      height: var(--banana-tab-underlined-size);
    }

    .tab-pos--left div[part='active-tab-underlined'] {
      right: 0;
      width: var(--banana-tab-underlined-size);
    }

    .tab-pos--right div[part='active-tab-underlined'] {
      left: 0;
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
