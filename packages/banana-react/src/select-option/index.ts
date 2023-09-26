import { createComponent } from '@lit-labs/react';
import { BSelectOption } from 'banana-ui';
import * as React from 'react';

export const SelectOption = createComponent({
  tagName: 'b-select-option',
  react: React,
  elementClass: BSelectOption,
});
