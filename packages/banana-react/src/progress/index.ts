import { createComponent } from '@lit-labs/react';
import { BProgress } from 'banana-ui';
import * as React from 'react';

export const Progress = createComponent({
  tagName: 'b-progress',
  react: React,
  elementClass: BProgress,
});
