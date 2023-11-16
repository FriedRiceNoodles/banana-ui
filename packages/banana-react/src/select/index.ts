import { createComponent } from '@lit-labs/react';
import { BSelect } from 'banana-ui';
import * as React from 'react';

export const Select = createComponent({
  tagName: 'b-select',
  react: React,
  elementClass: BSelect,
  events: {
    onChange: 'change',
  },
});
