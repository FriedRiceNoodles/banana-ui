/**
 * title: 基本使用
 */

import { Tooltip } from '@banana-ui/react';
import React from 'react';

export default function BasicUsage() {
  return (
    <div>
      <Tooltip content="This is a tooltip.">
        <span>Hover me!</span>
      </Tooltip>
    </div>
  );
}
