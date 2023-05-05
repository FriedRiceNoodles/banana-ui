import { createComponent } from '@lit-labs/react';
import { BCollapse } from 'banana-ui';
import * as React from 'react';

export const Collapse = createComponent({
  tagName: 'b-collapse',
  react: React,
  elementClass: BCollapse,
  events: {
    onShow: 'show',
    onAfterShow: 'afterShow',
    onHide: 'hide',
    onAfterHide: 'afterHide',
  },
});
