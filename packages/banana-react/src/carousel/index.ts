import { createComponent } from '@lit-labs/react';
import { BCarousel } from 'banana-ui';
import * as React from 'react';

export const Carousel = createComponent({
  tagName: 'b-carousel',
  react: React,
  elementClass: BCarousel,
});
