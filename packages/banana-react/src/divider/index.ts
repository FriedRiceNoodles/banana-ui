import { createComponent } from '@lit-labs/react';
import { BDivider } from 'banana-ui';
import * as React from 'react';

export const Divider = createComponent({
  tagName: 'b-divider',
  react: React,
  elementClass: BDivider,
});
