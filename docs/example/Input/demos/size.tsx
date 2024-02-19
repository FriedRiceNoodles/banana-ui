/**
 * title: 尺寸
 * description: 通过设置`size`属性可以控制输入框的大小，可选值为`small`、`medium`和 `large`；高度分别为`24px`、`32px`和 `40px`。默认为`medium`。
 */

import { Input } from '@banana-ui/react';
import React from 'react';

export default function Size() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <Input size="small" placeholder="Small size" />
      <Input size="medium" placeholder="Medium size" />
      <Input size="large" placeholder="Large size" />
    </div>
  );
}
