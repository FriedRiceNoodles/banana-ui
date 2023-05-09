import { createComponent, EventName } from '@lit-labs/react';
import * as React from 'react';
import { BOverlay } from 'banana-ui';

export const Overlay = createComponent({
  react: React,
  tagName: 'b-overlay',
  elementClass: BOverlay,
  events: {
    onMaskClose: 'handleMaskClose' as EventName<CustomEvent<string>>,
  },
});
