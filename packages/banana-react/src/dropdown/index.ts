import { BDropdown } from '@banana-ui/banana';
import { createComponent } from '@lit-labs/react';
import * as React from 'react';

export const Dropdown = createComponent({
  tagName: 'b-dropdown',
  react: React,
  elementClass: BDropdown,
});
