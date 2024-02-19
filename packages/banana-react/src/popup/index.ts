import { BPopup } from '@banana-ui/banana';
import { createComponent } from '@lit-labs/react';
import * as React from 'react';

export const Popup = createComponent({
  tagName: 'b-popup',
  react: React,
  elementClass: BPopup,
  events: {
    onClose: 'close',
  },
});
