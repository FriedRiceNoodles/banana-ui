import { BMarquee } from '@banana-ui/banana';
import { createComponent } from '@lit-labs/react';
import * as React from 'react';

export const Marquee = createComponent({
  tagName: 'b-marquee',
  react: React,
  elementClass: BMarquee,
});
