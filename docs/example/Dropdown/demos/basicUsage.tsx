/**
 * title: 基本使用
 */

import { Button, Divider, Dropdown, Menu, MenuItem } from '@banana-ui/react';

export default function BasicUsage() {
  return (
    <Dropdown>
      <Button>Hover me!</Button>
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
