import { BRadioGroup } from '@banana-ui/banana';
import { EventName, createComponent } from '@lit-labs/react';
import * as React from 'react';

const events = {
  onChange: 'change' as EventName<
    CustomEvent<{
      value: string;
    }>
  >,
};

export const RadioGroup = createComponent({
  tagName: 'b-radio-group',
  react: React,
  elementClass: BRadioGroup,
  events,
});
