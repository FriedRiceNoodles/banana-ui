import { BCountdown } from '@banana-ui/banana';
import { createComponent } from '@lit-labs/react';
import * as React from 'react';

export const Countdown = createComponent({
  tagName: 'b-countdown',
  react: React,
  elementClass: BCountdown,
  events: {
    onChange: 'change',
    onFinish: 'finish',
  },
});
