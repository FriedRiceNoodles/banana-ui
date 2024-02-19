import { BOverlay } from '@banana-ui/banana';
import { createComponent } from '@lit-labs/react';
import * as React from 'react';

export const Overlay = createComponent({
  react: React,
  tagName: 'b-overlay',
  elementClass: BOverlay,
  events: {
    onClose: 'close',
  },
});
