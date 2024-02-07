import { createComponent } from '@lit-labs/react';
import { BSwitch } from 'banana-ui';
import * as React from 'react';

export const Switch = createComponent({
  tagName: 'b-switch',
  react: React,
  elementClass: BSwitch,
  events: {
    onChange: 'change',
  },
});
