/**
 * title: 禁用折叠面板
 * description: 使用`disabled`属性禁用该折叠面板。
 */

import { Collapse } from '@banana-ui/react';
import React from 'react';

export default function CollapseDemo1() {
  return (
    <div>
      <Collapse disabled title="点我">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </Collapse>
    </div>
  );
}
