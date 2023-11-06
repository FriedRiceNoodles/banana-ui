import { css } from 'lit';

export default css`
  :host {
    box-sizing: border-box;
    color: var(--banana-color-text, #202020);
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`;
