/**
 * title: 显示箭头
 * description: 使用`arrow`插槽给下拉菜单添加箭头。
 */

import { Dropdown, Button, Divider, MenuItem } from '@banana/banana-react';
import React from 'react';

export default function Arrow() {
  return (
    <>
      <Dropdown margin={15} style={{ marginRight: '10px' }}>
        <Button>Hover me!</Button>
        <div slot="drop" style={{ maxWidth: '200px', background: '#f5f5f5' }}>
          <MenuItem>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
          <MenuItem>Option 3</MenuItem>
          <MenuItem>Option 4</MenuItem>
          <MenuItem>Option 5</MenuItem>
          <Divider />
          <MenuItem>Option A</MenuItem>
          <MenuItem>Option B</MenuItem>
        </div>
        <div
          style={{
            position: 'absolute',
            width: '12px',
            height: '12px',
            backgroundColor: '#f5f5f5',
            zIndex: '-1',
          }}
          className="arrow"
          slot="arrow"
        ></div>
      </Dropdown>

      <Dropdown margin={15} placement="top">
        <Button>Hover me!</Button>
        <div slot="drop" style={{ maxWidth: '200px', background: '#f5f5f5' }}>
          <MenuItem>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
          <MenuItem>Option 3</MenuItem>
          <MenuItem>Option 4</MenuItem>
          <MenuItem>Option 5</MenuItem>
          <Divider />
          <MenuItem>Option A</MenuItem>
          <MenuItem>Option B</MenuItem>
        </div>
        <div
          style={{
            position: 'absolute',
            width: '12px',
            height: '12px',
            backgroundColor: '#f5f5f5',
            zIndex: '-1',
          }}
          className="arrow"
          slot="arrow"
        ></div>
      </Dropdown>
    </>
  );
}
