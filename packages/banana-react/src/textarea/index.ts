import { BTextarea } from '@banana-ui/banana';
import { createComponent } from '@lit-labs/react';
import * as React from 'react';

const events = { onChange: 'change' };

export const Textarea = createComponent({
  tagName: 'b-textarea',
  react: React,
  elementClass: BTextarea,
  events,
});
