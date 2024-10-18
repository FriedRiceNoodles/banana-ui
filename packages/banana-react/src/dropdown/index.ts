import { BDropdown } from '@banana-ui/banana';
import { createComponent } from '@lit-labs/react';
import * as React from 'react';

const events = {
  onShow: 'show',
  onAfterShow: 'afterShow',
  onHide: 'hide',
  onAfterHide: 'afterHide',
};

export const Dropdown = createComponent({
  tagName: 'b-dropdown',
  react: React,
  elementClass: BDropdown,
  events,
});
