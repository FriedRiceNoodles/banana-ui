import { BRating } from '@banana-ui/banana';
import { createComponent } from '@lit-labs/react';
import * as React from 'react';

export const Rating = createComponent({
  tagName: 'b-rating',
  react: React,
  elementClass: BRating,
  events: {
    onChange: 'change',
  },
});
