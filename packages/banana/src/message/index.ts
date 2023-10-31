import { CSSResultGroup, html, LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import styles from './index.styles';

export type MessageType = 'success' | 'warning' | 'info' | 'error' | 'loading';

type Message = {
  id: number;
  type: MessageType;
  content: string;
  duration: number;
  onClose?: () => void;
};

export type Config = {
  type?: MessageType;
  content: string;
  duration?: number;
  onClose?: () => void;
};

export type ConfigWithoutType = Omit<Config, 'type'>;

const icons: Record<MessageType, TemplateResult<1>> = {
  info: html`<svg
    t="1698370622289"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="1202"
    width="20"
    height="20"
  >
    <path
      d="M512 97.52381c228.912762 0 414.47619 185.563429 414.47619 414.47619s-185.563429 414.47619-414.47619 414.47619S97.52381 740.912762 97.52381 512 283.087238 97.52381 512 97.52381z m36.571429 341.333333h-73.142858v292.571428h73.142858V438.857143z m0-121.904762h-73.142858v73.142857h73.142858v-73.142857z"
      p-id="1203"
      fill="currentColor"
    ></path>
  </svg>`,
  success: html`<svg
    t="1698370652573"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="1493"
    width="20"
    height="20"
  >
    <path
      d="M512 97.52381c228.912762 0 414.47619 185.563429 414.47619 414.47619s-185.563429 414.47619-414.47619 414.47619S97.52381 740.912762 97.52381 512 283.087238 97.52381 512 97.52381z m193.194667 218.331428L447.21981 581.315048l-103.936-107.812572-52.662858 50.761143 156.379429 162.230857 310.662095-319.683047-52.467809-50.956191z"
      p-id="1494"
      fill="currentColor"
    ></path>
  </svg>`,
  warning: html`<svg
    t="1698370714362"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="1738"
    width="20"
    height="20"
  >
    <path
      d="M545.718857 130.608762c11.337143 6.265905 20.699429 15.555048 26.989714 26.819048l345.014858 617.667047a68.87619 68.87619 0 0 1-26.989715 93.915429c-10.313143 5.705143-21.942857 8.704-33.718857 8.704H166.985143A69.266286 69.266286 0 0 1 97.52381 808.643048c0-11.751619 2.998857-23.28381 8.752761-33.548191l344.990477-617.642667a69.656381 69.656381 0 0 1 94.451809-26.819047z m0.999619 539.867428h-69.461333v69.071239h69.485714V670.47619z m0-298.374095h-69.461333v252.318476h69.485714V372.102095z"
      p-id="1739"
      fill="currentColor"
    ></path>
  </svg> `,
  error: html`<svg
    t="1698370742011"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="1937"
    width="20"
    height="20"
  >
    <path
      d="M512 97.52381c228.912762 0 414.47619 185.563429 414.47619 414.47619s-185.563429 414.47619-414.47619 414.47619S97.52381 740.912762 97.52381 512 283.087238 97.52381 512 97.52381z m129.29219 233.447619l-129.267809 129.29219-129.316571-129.29219-51.736381 51.736381 129.316571 129.267809-129.316571 129.316571 51.736381 51.736381L512 563.687619l129.29219 129.316571 51.736381-51.73638L563.687619 512l129.316571-129.29219-51.73638-51.736381z"
      p-id="1938"
      fill="currentColor"
    ></path>
  </svg>`,
  loading: html`<svg
    t="1698376710597"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="5032"
    width="20"
    height="20"
  >
    <path
      d="M512 170.666667C323.477333 170.666667 170.666667 323.477333 170.666667 512s152.810667 341.333333 341.333333 341.333333 341.333333-152.810667 341.333333-341.333333h85.333334c0 235.648-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512 276.352 85.333333 512 85.333333v85.333334z"
      p-id="5033"
      fill="currentColor"
    ></path>
  </svg>`,
};

@customElement('b-message')
export default class BMessage extends LitElement {
  static styles?: CSSResultGroup = styles;

  private static _activeContainer: HTMLElement | null = null;

  // To generate unique id for each message.
  private static _messageCount = 0;

  private static _messageQueue: Message[] = [];

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  private static _updateContainer() {
    if (this._activeContainer) {
      (this._activeContainer as BMessage).requestUpdate();
    }
  }

  static closeMessage(id: number) {
    const index = this._messageQueue.findIndex((message) => message.id === id);
    if (index > -1) {
      const { onClose } = this._messageQueue[index];
      this._messageQueue.splice(index, 1);
      this._updateContainer();
      if (onClose) {
        onClose();
      }
    }

    // If there is no message, remove the container.
    if (this._messageQueue.length === 0 && this._activeContainer) {
      document.body.removeChild(this._activeContainer);
      this._activeContainer = null;
    }
  }

  static open({ type = 'info', content, duration = 3, onClose }: Config) {
    if (!this._activeContainer) {
      this._activeContainer = document.createElement('b-message');
      document.body.appendChild(this._activeContainer);
    }

    const id = this._messageCount;
    this._messageCount += 1;
    const newMessage: Message = {
      id,
      type,
      content,
      duration,
      onClose,
    };
    this._messageQueue.push(newMessage);
    this._updateContainer();

    // If duration is set to 0, the message will not be closed automatically.
    if (duration > 0) {
      setTimeout(() => {
        this.closeMessage(id);
      }, duration * 1000);
    }

    return id;
  }

  static info(options: ConfigWithoutType) {
    return this.open({ ...options, type: 'info' });
  }

  static success(options: ConfigWithoutType) {
    return this.open({ ...options, type: 'success' });
  }

  static warning(options: ConfigWithoutType) {
    return this.open({ ...options, type: 'warning' });
  }

  static error(options: ConfigWithoutType) {
    return this.open({ ...options, type: 'error' });
  }

  static loading(options: ConfigWithoutType) {
    return this.open({ ...options, type: 'loading' });
  }

  private get _getMessages() {
    return BMessage._messageQueue;
  }

  render() {
    return html`
      <div class="messages__box" part="box">
        ${this._getMessages.map((message) => {
          return html`
            <div
              part="base"
              class=${classMap({
                message: true,
                [`message--${message.type}`]: true,
              })}
            >
              <span class="message__icon" part="icon">${icons[message.type]}</span>
              <div class="message__content" part="content">${message.content}</div>
            </div>
          `;
        })}
      </div>
    `;
  }
}

// For CDN usage
if (window && !window.BMessage) {
  window.BMessage = BMessage;
}

declare global {
  interface Window {
    BMessage: typeof BMessage;
  }
}
