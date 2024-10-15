import { BTabs } from '@banana-ui/banana';
import { createComponent } from '@lit-labs/react';
import * as React from 'react';

const events = {};

export const Tabs = createComponent({
  tagName: 'b-tabs',
  react: React,
  elementClass: BTabs,
  events,
});
