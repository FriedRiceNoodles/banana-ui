import { createComponent } from '@lit-labs/react';
import { BMenu } from 'banana-ui';
import * as React from 'react';

export const Menu = createComponent({
  tagName: 'b-menu',
  react: React,
  elementClass: BMenu,
  events: {
    onSelect: 'select',
  },
});
