import { BCheckbox } from '@banana-ui/banana';
import { createComponent } from '@lit-labs/react';
import * as React from 'react';

export const Checkbox = createComponent({
  tagName: 'b-checkbox',
  react: React,
  elementClass: BCheckbox,
  events: {
    onChange: 'change',
  },
});
