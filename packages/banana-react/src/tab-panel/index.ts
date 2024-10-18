import { BTabPanel } from '@banana-ui/banana';
import { createComponent } from '@lit-labs/react';
import * as React from 'react';

const events = {};

export const TabPanel = createComponent({
  tagName: 'b-tab-panel',
  react: React,
  elementClass: BTabPanel,
  events,
});
