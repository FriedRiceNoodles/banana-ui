/**
 * title: 禁用下拉菜单
 * debug: true
 */

import { Dropdown, Button, Divider, Menu, MenuItem } from '@banana/banana-react';
import React from 'react';

export default function BasicUsage() {
  return (
    <Dropdown disabled>
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
