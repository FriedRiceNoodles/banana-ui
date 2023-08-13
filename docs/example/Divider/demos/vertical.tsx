/**
 * title: 垂直方向的分割线
 * description: 使用`vertical`参数，让分割线变成纵向的。需要注意的是，垂直方向的分割线**依赖于父元素的高度**，因此适合在显式定义了高度的flex布局容器中使用。
 */

import React from 'react';
import { Button, Divider } from '@banana/banana-react';

export default function vertical() {
  return (
    <div style={{ display: 'flex', height: '40px', alignItems: 'center' }}>
      <Button type="primary">主要按钮</Button>
      <Divider vertical />
      <Button>默认按钮</Button>
      <Divider vertical />
      <Button type="danger">成功按钮</Button>
    </div>
  );
}
