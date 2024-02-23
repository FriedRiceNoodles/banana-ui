import { BInput } from '@banana-ui/banana';
import { EventName, createComponent } from '@lit-labs/react';
import * as React from 'react';

const events = {
  onChange: 'change' as EventName<
    CustomEvent<{
      value: string;
    }>
  >,
};

export const Input = createComponent({
  tagName: 'b-input',
  react: React,
  elementClass: BInput,
  events,
});
