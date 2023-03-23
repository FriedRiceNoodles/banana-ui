/**
 * title: 按钮类型
 * description: 使用`type`属性，按钮支持不同的类型：`primary`、`success`、`warning`、`danger`和默认类型。
 */

import { Button } from '@banana/banana-react';
import React from 'react';

export default function ButtonDemo1() {
  return (
    <div
      style={{
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
      }}
    >
      <Button type="primary">主要按钮</Button>
      <Button type="success">成功按钮</Button>
      <Button type="warning">警告按钮</Button>
      <Button type="danger">危险按钮</Button>
      <Button type="dashed">虚线按钮</Button>
      <Button>默认按钮</Button>
    </div>
  );
}
