import { createComponent } from '@lit-labs/react';
import { BCountdown } from 'banana-ui';
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
