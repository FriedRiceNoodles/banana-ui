import { CSSResultGroup, html, LitElement, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BTabItem, BTabPanel } from '..';
import styles from './index.styles';

@customElement('b-tabs')
export default class BTabs extends LitElement {
  static styles?: CSSResultGroup = styles;

  private _tabs: BTabItem[] = [];

  private _panels: BTabPanel[] = [];

  @query('slot[name="nav"]')
  nav: HTMLSlotElement | undefined;

  @query('slot[name="body"]')
  body: HTMLSlotElement | undefined;

  @query('.tabs__underlined')
  tabUnderlined!: HTMLElement;

  @property({ type: String })
  position: 'top' | 'bottom' | 'left' | 'right' = 'top';

  @property({ type: String })
  type: 'line' | 'block' = 'line';

  @state()
  private _activeTab: BTabItem | undefined;
  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected updated(): void {
    void this.syncTabsAndPanels();
  }

  private getAllTabs() {
    return this.nav?.assignedElements() as BTabItem[];
  }

  private getAllPanels() {
    return this.body?.assignedElements() as BTabPanel[];
  }

  private async syncTabsAndPanels() {
    this._tabs = this.getAllTabs();
    this._panels = this.getAllPanels();
    if (!this._activeTab) {
      this.setActiveTab(this._tabs.filter((el) => !el.disabled)?.[0]);
    }
    await this.updateComplete;
    if (this.type === 'line') {
      this.calcActiveTabUnderlinedPosition();
    }
  }

  private calcActiveTabUnderlinedPosition() {
    if (this._activeTab) {
      const width = this._activeTab?.clientWidth;
      const height = this._activeTab.clientHeight;

      const allTabs = this.getAllTabs();
      const currentTabMoveOffset = allTabs.slice(0, allTabs.indexOf(this._activeTab)).reduce(
        (preVal, tabItem) => ({
          top: preVal.top + tabItem.clientHeight,
          left: preVal.left + tabItem.clientWidth,
        }),
        {
          top: 0,
          left: 0,
        },
      );
      switch (this.position) {
        case 'top':
        case 'bottom':
          this.tabUnderlined.style.height = '';
          this.tabUnderlined.style.width = `${width}px`;
          this.tabUnderlined.style.transform = `translate3d(${currentTabMoveOffset.left}px, 0, 0)`;
          break;

        case 'left':
        case 'right':
          this.tabUnderlined.style.width = '';
          this.tabUnderlined.style.height = `${height}px`;
          this.tabUnderlined.style.transform = `translate3d(0, ${currentTabMoveOffset.top}px, 0)`;
          break;
      }
    }
  }

  private setActiveTab(tabItem: BTabItem) {
    if (tabItem !== this._activeTab && !tabItem.disabled) {
      const preActiveTabItem = this._activeTab;
      this._activeTab = tabItem;
      this._tabs.forEach((el) => (el.active = el === this._activeTab));
      this._panels.forEach((el) => (el.active = el.name === this._activeTab?.panel));

      if (preActiveTabItem) {
        this.dispatchEvent(
          new CustomEvent('hide', {
            bubbles: true,
            cancelable: false,
            composed: true,
            detail: {
              name: preActiveTabItem.panel,
            },
          }),
        );
      }

      this.dispatchEvent(
        new CustomEvent('show', {
          bubbles: true,
          cancelable: false,
          composed: true,
          detail: {
            name: this._activeTab.panel,
          },
        }),
      );
    }
  }

  private handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const tabItem = target.closest('b-tab-item') as BTabItem;
    if (tabItem) {
      this.setActiveTab(tabItem);
    }
  }

  /** Shows the specified tab panel. */
  show(panel: string) {
    const tab = this._tabs.find((el) => el.panel === panel);

    if (tab) {
      this.setActiveTab(tab);
    }
  }

  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          tab: true,
          'tab-pos--top': this.position === 'top',
          'tab-pos--bottom': this.position === 'bottom',
          'tab-pos--left': this.position === 'left',
          'tab-pos--right': this.position === 'right',
          'tab-type--block': this.type === 'block',
        })}
        @click=${this.handleClick}
        @keydown=${this.handleClick}
      >
        <div class="tab__container">
          <div class="tab__nav" part="nav">
            <slot name="left-extra-render"></slot>
            <div part="nav-list" class="tab__nav-wrapper">
              ${this.type === 'line'
                ? html`<div part="active-tab-underlined" class="tabs__underlined"></div>`
                : nothing}
              <slot name="nav"></slot>
            </div>
            <slot name="right-extra-render"></slot>
          </div>
        </div>
        <slot name="body"></slot>
      </div>
    `;
  }
}
