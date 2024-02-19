import { BButton } from '@banana-ui/banana';
import { createComponent } from '@lit-labs/react';
import * as React from 'react';

export const Button = createComponent({
  tagName: 'b-button',
  react: React,
  elementClass: BButton,
});
