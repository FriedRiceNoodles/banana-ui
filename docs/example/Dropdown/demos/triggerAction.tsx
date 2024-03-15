/**
 * title: 触发方式
 * description: 通过 `triggerAction` 参数设置触发方式，可选值为 `hover`、`click`， 默认为 `hover`。
 */

import { Button, Divider, Dropdown, Menu, MenuItem } from '@banana-ui/react';

export default function TriggerAction() {
  return (
    <Dropdown triggerAction="click">
      <Button>Click me!</Button>
      <Menu slot="drop" style={{ maxWidth: '200px' }}>
        <MenuItem>Option 1</MenuItem>
        <MenuItem>Option 2</MenuItem>
        <MenuItem>Option 3</MenuItem>
        <MenuItem>Option 4</MenuItem>
        <MenuItem>Option 5</MenuItem>
        <Divider />
        <MenuItem>Option A</MenuItem>
        <MenuItem>Option B</MenuItem>
      </Menu>
    </Dropdown>
  );
}
