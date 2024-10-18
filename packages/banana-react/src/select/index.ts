import { BSelect } from '@banana-ui/banana';
import { EventName, createComponent } from '@lit-labs/react';
import * as React from 'react';

const events = {
  onChange: 'change' as EventName<
    CustomEvent<{
      value: string | string[];
    }>
  >,
};

export const Select = createComponent({
  tagName: 'b-select',
  react: React,
  elementClass: BSelect,
  events,
});
