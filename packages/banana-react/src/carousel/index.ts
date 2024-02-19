import { BCarousel } from '@banana-ui/banana';
import { createComponent } from '@lit-labs/react';
import * as React from 'react';

export const Carousel = createComponent({
  tagName: 'b-carousel',
  react: React,
  elementClass: BCarousel,
  events: {
    onChange: 'change',
  },
});
