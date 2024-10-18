import { BTooltip } from '@banana-ui/banana';
import { createComponent } from '@lit-labs/react';
import * as React from 'react';

export const Tooltip = createComponent({
  tagName: 'b-tooltip',
  react: React,
  elementClass: BTooltip,
});
