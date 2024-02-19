import { BRadioGroup } from '@banana-ui/banana';
import { createComponent } from '@lit-labs/react';
import * as React from 'react';

export const RadioGroup = createComponent({
  tagName: 'b-radio-group',
  react: React,
  elementClass: BRadioGroup,
  events: {
    onChange: 'change',
  },
});
