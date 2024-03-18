/**
 * title: 禁用菜单项
 * description: 使用`disabled`参数可以将菜单项设置为禁用状态。
 */

import { Divider, Menu, MenuItem } from '@banana-ui/react';

export default function BasicUsage() {
  return (
    <Menu style={{ maxWidth: '200px' }}>
      <MenuItem>Option 1</MenuItem>
      <MenuItem>Option 2</MenuItem>
      <MenuItem>Option 3</MenuItem>
      <Divider />
      <MenuItem disabled>Disabled</MenuItem>
    </Menu>
  );
}
