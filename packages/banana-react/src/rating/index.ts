import { createComponent } from '@lit-labs/react';
import { BRating } from 'banana-ui';
import * as React from 'react';

export const Rating = createComponent({
  tagName: 'b-rating',
  react: React,
  elementClass: BRating,
  events: {
    onChange: 'change',
  },
});
