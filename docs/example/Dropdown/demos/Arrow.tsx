/**
 * title: 显示箭头
 * description: 使用`arrow`插槽给下拉菜单添加箭头。
 */

import { Button, Divider, Dropdown, MenuItem } from '@banana-ui/react';
import React from 'react';

export default function Arrow() {
  return (
    <>
      <Dropdown margin={15} style={{ marginRight: '10px' }}>
        <Button>Hover me!</Button>
        <div slot="drop" style={{ width: '380px', padding: '10px', boxSizing: 'border-box', background: '#ccc' }}>
          <MenuItem>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
          <Divider />
          <MenuItem>Option A</MenuItem>
          <MenuItem>Option B</MenuItem>
        </div>
        <div
          style={{
            position: 'absolute',
            width: '12px',
            height: '12px',
            backgroundColor: '#ccc',
            zIndex: '-1',
          }}
          className="arrow"
          slot="arrow"
        ></div>
      </Dropdown>

      <Dropdown margin={15} placement="topRight">
        <Button>topRight</Button>
        <div slot="drop" style={{ width: '600px', background: '#ccc' }}>
          <MenuItem>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
          <Divider />
          <MenuItem>Option A</MenuItem>
          <MenuItem>Option B</MenuItem>
        </div>
        <div
          style={{
            position: 'absolute',
            width: '12px',
            height: '12px',
            backgroundColor: '#ccc',
            zIndex: '-1',
          }}
          className="arrow"
          slot="arrow"
        ></div>
      </Dropdown>
    </>
  );
}
