import { createComponent } from '@lit-labs/react';
import { BTooltip } from 'banana-ui';
import * as React from 'react';

export const Tooltip = createComponent({
  tagName: 'b-tooltip',
  react: React,
  elementClass: BTooltip,
});
