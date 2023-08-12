import { createComponent } from '@lit-labs/react';
import { BInput } from 'banana-ui';
import * as React from 'react';

export const Input = createComponent({
  tagName: 'b-input',
  react: React,
  elementClass: BInput,
});
