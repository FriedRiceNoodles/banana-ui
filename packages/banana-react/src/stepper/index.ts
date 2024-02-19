import { BStepper } from '@banana-ui/banana';
import { createComponent } from '@lit-labs/react';
import * as React from 'react';

export const Stepper = createComponent({
  tagName: 'b-stepper',
  react: React,
  elementClass: BStepper,
  events: {
    onChange: 'change',
  },
});
