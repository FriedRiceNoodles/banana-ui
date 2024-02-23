import { BMenu } from '@banana-ui/banana';
import { EventName, createComponent } from '@lit-labs/react';
import * as React from 'react';

const events = {
  onSelect: 'select' as EventName<
    CustomEvent<{
      item: string;
    }>
  >,
};

export const Menu = createComponent({
  tagName: 'b-menu',
  react: React,
  elementClass: BMenu,
  events,
});
