import { BCheckbox } from '@banana-ui/banana';
import { EventName, createComponent } from '@lit-labs/react';
import * as React from 'react';

const events = {
  onChange: 'change' as EventName<
    CustomEvent<{
      checked: boolean;
    }>
  >,
};

export const Checkbox = createComponent({
  tagName: 'b-checkbox',
  react: React,
  elementClass: BCheckbox,
  events,
});
