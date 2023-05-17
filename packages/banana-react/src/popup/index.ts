import { createComponent } from '@lit-labs/react';
import { BPopup } from 'banana-ui';
import * as React from 'react';

export const Popup = createComponent({
  tagName: 'b-popup',
  react: React,
  elementClass: BPopup,
  events: {
    onClose: 'close',
  },
});
