import { BTabs } from '@banana-ui/banana';
import { createComponent, EventName } from '@lit-labs/react';
import * as React from 'react';

const events = {
  onHide: 'hide' as EventName<
    CustomEvent<{
      name: string;
    }>
  >,
  onShow: 'show' as EventName<
    CustomEvent<{
      name: string;
    }>
  >,
};

export const Tabs = createComponent({
  tagName: 'b-tabs',
  react: React,
  elementClass: BTabs,
  events,
});
