/**
 * title: 触发事件
 * description: 你可以使用`value`参数作为一个菜单项的唯一标识，当菜单项被选中时，会触发`select`事件。通过监听这个事件，可以响应用户对菜单项的操作。
 */

import { Divider, Menu, MenuItem } from '@banana/banana-react';
import React from 'react';

export default function BasicUsage() {
  const onSelect = (event: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log(event.detail.item.value);
  };

  return (
    <Menu onSelect={onSelect} style={{ maxWidth: '200px' }}>
      <MenuItem value="opt-1">Option 1</MenuItem>
      <MenuItem value="opt-2">Option 2</MenuItem>
      <MenuItem value="opt-3">Option 3</MenuItem>
      <Divider />
      <MenuItem value="disabled" disabled>
        Disabled
      </MenuItem>
    </Menu>
  );
}
