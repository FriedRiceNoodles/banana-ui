import { BStepper } from '@banana-ui/banana';
import { EventName, createComponent } from '@lit-labs/react';
import * as React from 'react';

const events = {
  onChange: 'change' as EventName<
    CustomEvent<{
      value: number;
    }>
  >,
};

export const Stepper = createComponent({
  tagName: 'b-stepper',
  react: React,
  elementClass: BStepper,
  events,
});
