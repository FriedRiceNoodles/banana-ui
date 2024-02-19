/**
 * title: 弹出位置
 * description: 通过`placement`参数使下拉菜单从不同的位置弹出
 */

import { Button, Divider, Dropdown, Menu, MenuItem } from '@banana-ui/react';
import React from 'react';

export default function BasicUsage() {
  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      <Dropdown placement="bottomLeft">
        <Button>bottomLeft(default)</Button>
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

      <Dropdown placement="bottom">
        <Button>bottom</Button>
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

      <Dropdown placement="bottomRight">
        <Button>bottomRight</Button>
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

      <Dropdown placement="topLeft">
        <Button>topLeft</Button>
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

      <Dropdown placement="top">
        <Button>top</Button>
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

      <Dropdown placement="topRight">
        <Button>topRight</Button>
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
    </div>
  );
}
