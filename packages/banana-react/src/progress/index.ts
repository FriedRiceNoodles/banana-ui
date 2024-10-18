import { BProgress } from '@banana-ui/banana';
import { createComponent } from '@lit-labs/react';
import * as React from 'react';

export const Progress = createComponent({
  tagName: 'b-progress',
  react: React,
  elementClass: BProgress,
});
