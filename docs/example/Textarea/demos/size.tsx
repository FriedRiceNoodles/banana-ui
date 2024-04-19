/**
 * title: 尺寸
 * description: 通过设置`size`属性可以控制输入框的大小，可选值为`small`、`medium`和 `large`；高度分别为`24px`、`32px`和 `40px`。默认为`medium`。
 */

import { Textarea } from '@banana-ui/react';

export default function Size() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <Textarea size="large" rows={1} placeholder="Large size" />
      <Textarea size="medium" rows={1} placeholder="Medium size" />
      <Textarea size="small" rows={1} placeholder="Small size" />
    </div>
  );
}
