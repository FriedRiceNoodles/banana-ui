import { createComponent } from '@lit-labs/react';
import { BOverlay } from 'banana-ui';
import * as React from 'react';

export const Overlay = createComponent({
  react: React,
  tagName: 'b-overlay',
  elementClass: BOverlay,
  events: {
    onClose: 'close',
    onAfterShow: 'afterShow',
    onAfterHide: 'afterHide',
  },
});
