import { BRating } from '@banana-ui/banana';
import { EventName, createComponent } from '@lit-labs/react';
import * as React from 'react';

const events = {
  onChange: 'change' as EventName<
    CustomEvent<{
      value: number;
    }>
  >,
};

export const Rating = createComponent({
  tagName: 'b-rating',
  react: React,
  elementClass: BRating,
  events,
});
