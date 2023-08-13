import { createComponent } from '@lit-labs/react';
import { BDropdown } from 'banana-ui';
import * as React from 'react';

export const Dropdown = createComponent({
  tagName: 'b-dropdown',
  react: React,
  elementClass: BDropdown,
});
