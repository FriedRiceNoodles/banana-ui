import { CSSResultGroup, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, query, queryAssignedElements, state } from 'lit/decorators.js';
import styles from './index.styles';
import { formatTimeStr } from './util';

@customElement('b-countdown')
export default class BCountdown extends LitElement {
  static styles?: CSSResultGroup = styles;

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this._timer && clearInterval(this._timer);
  }

  @property({ type: Number, reflect: true }) time = 0;

  @property({ type: String, reflect: true }) format = 'HH:mm:ss';

  @property({ type: Boolean, reflect: true }) separate = false;

  // Internal time, used to render
  @state()
  private _timeLeft = this.time;

  @state()
  private _timer: ReturnType<typeof setInterval> | undefined;

  @state()
  private _startTime: number | undefined;

  @queryAssignedElements({ slot: 'separator' })
  private _separator: HTMLElement[] | undefined;

  @query('.countdown--separate')
  private _countdownSeparate: HTMLElement | undefined;

  updated(_changedProperties: PropertyValueMap<this>) {
    if (this.time < 0) {
      console.error('[b-countdown] time must be greater than 0');
      return;
    }

    if (_changedProperties.has('time')) {
      // Clear previous timer
      this._timer && clearInterval(this._timer);

      this._startTime = Date.now();
      this._timeLeft = this.time;

      // If using requestAnimationFrame, the time will be updated too frequently, that will cause flicker
      // Update internal time with setInterval, 30times/s
      const interval = 1000 / 30;
      this._timer = setInterval(() => {
        const now = Date.now();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const timeLeft = this.time - (now - this._startTime!);

        // Fire change event
        this.dispatchEvent(new CustomEvent('change', { detail: { timeLeft } }));

        if (timeLeft <= 0) {
          this._timeLeft = 0;
          this._timer && clearInterval(this._timer);

          // Fire finish event
          this.dispatchEvent(new CustomEvent('finish'));
        } else {
          this._timeLeft = timeLeft;
        }
      }, interval);
    }

    // If separate is true, insert separator between countdown items
    if (_changedProperties.has('separate') && this.separate && this._separator && this._separator.length > 0) {
      const separatorContent = this._separator;
      // Set part attribute for separator
      separatorContent[0].setAttribute('part', 'separator');
      const countdownItems = this._countdownSeparate?.querySelectorAll('.countdown__item');
      countdownItems?.forEach((item, index) => {
        if (index === 0) {
          return;
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        item.insertAdjacentElement('beforebegin', separatorContent[0].cloneNode(true) as HTMLElement);
      });
    }
  }

  render() {
    const _timeDataObject = formatTimeStr(this._timeLeft, this.format);
    const _time = _timeDataObject.text;

    const defaultContent = html` <span class="countdown countdown--default" part="base">${_time}</span> `;

    const formattedItems = _timeDataObject.formattedTextArray.map((item, index) => {
      return html`<span class="countdown__item" part="separate-item separate-item-${index}">${item}</span>`;
    });

    const separateContent = html`
      <span class="countdown countdown--separate" part="base"> ${formattedItems} </span>
      <slot hidden name="separator" class="countdown__separator"></slot>
    `;

    return html`${this.separate ? separateContent : defaultContent}`;
  }
}
