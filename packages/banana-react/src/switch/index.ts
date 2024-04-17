import { BSwitch } from '@banana-ui/banana';
import { EventName, createComponent } from '@lit-labs/react';
import * as React from 'react';

const events = {
  onChange: 'change' as EventName<
    CustomEvent<{
      value: boolean;
    }>
  >,
};

export const Switch = createComponent({
  tagName: 'b-switch',
  react: React,
  elementClass: BSwitch,
  events,
});
