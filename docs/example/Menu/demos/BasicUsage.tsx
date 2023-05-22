/**
 * title: 基本使用
 * description: 用`Menu`组件包裹住`MenuItem`和`Divider`，可以创建出用于收纳一系列选项/操作的菜单。
 */

import { Divider, Menu, MenuItem } from '@banana/banana-react';
import React from 'react';

export default function BasicUsage() {
  return (
    <Menu style={{ maxWidth: '200px' }}>
      <MenuItem>Option 1</MenuItem>
      <MenuItem>Option 2</MenuItem>
      <MenuItem>Option 3</MenuItem>
      <MenuItem>Option 4</MenuItem>
      <MenuItem>Option 5</MenuItem>
      <Divider />
      <MenuItem>Option A</MenuItem>
      <MenuItem>Option B</MenuItem>
      <MenuItem>Option C</MenuItem>
    </Menu>
  );
}
