import { BTabItem } from '@banana-ui/banana';
import { createComponent } from '@lit-labs/react';
import * as React from 'react';

const events = {};

export const TabItem = createComponent({
  tagName: 'b-tab-item',
  react: React,
  elementClass: BTabItem,
  events,
});
