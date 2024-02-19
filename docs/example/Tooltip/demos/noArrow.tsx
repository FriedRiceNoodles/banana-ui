/**
 * title: 不展示箭头
 * description: 使用 `noArrow` 参数可隐藏箭头。
 */

import { Tooltip } from '@banana-ui/react';
import React from 'react';

export default function NoArrow() {
  return (
    <div>
      <Tooltip content="This is a tooltip." noArrow>
        <span>No Arrow</span>
      </Tooltip>
    </div>
  );
}
