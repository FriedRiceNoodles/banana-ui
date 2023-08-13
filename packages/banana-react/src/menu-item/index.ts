import { createComponent } from '@lit-labs/react';
import { BMenuItem } from 'banana-ui';
import * as React from 'react';

export const MenuItem = createComponent({
  tagName: 'b-menu-item',
  react: React,
  elementClass: BMenuItem,
});
