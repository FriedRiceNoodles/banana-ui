import { createComponent } from '@lit-labs/react';
import { BRadio } from 'banana-ui';
import * as React from 'react';

export const Radio = createComponent({
  tagName: 'b-radio',
  react: React,
  elementClass: BRadio,
});
