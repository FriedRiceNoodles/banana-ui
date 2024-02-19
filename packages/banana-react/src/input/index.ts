import { BInput } from '@banana-ui/banana';
import { createComponent } from '@lit-labs/react';
import * as React from 'react';

export const Input = createComponent({
  tagName: 'b-input',
  react: React,
  elementClass: BInput,
  events: {
    onChange: 'change',
  },
});
