import { BSelectOption } from '@banana-ui/banana';
import { createComponent } from '@lit-labs/react';
import * as React from 'react';

export const SelectOption = createComponent({
  tagName: 'b-select-option',
  react: React,
  elementClass: BSelectOption,
});
