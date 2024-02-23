import { BCarousel } from '@banana-ui/banana';
import { EventName, createComponent } from '@lit-labs/react';
import * as React from 'react';

const events = {
  onChange: 'change' as EventName<
    CustomEvent<{
      currentIndex: number;
    }>
  >,
};

export const Carousel = createComponent({
  tagName: 'b-carousel',
  react: React,
  elementClass: BCarousel,
  events,
});
