import { createComponent } from '@lit-labs/react';
import { BMarquee } from 'banana-ui';
import * as React from 'react';

export const Marquee = createComponent({
  tagName: 'b-marquee',
  react: React,
  elementClass: BMarquee,
});
