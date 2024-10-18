import { BCollapse } from '@banana-ui/banana';
import { createComponent } from '@lit-labs/react';
import * as React from 'react';

const events = {
  onShow: 'show',
  onAfterShow: 'afterShow',
  onHide: 'hide',
  onAfterHide: 'afterHide',
};

export const Collapse = createComponent({
  tagName: 'b-collapse',
  react: React,
  elementClass: BCollapse,
  events,
});
