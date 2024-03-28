/**
 * title: Rows
 * description: 使用 `rows` 属性更改显示的文本行数，默认为 4。
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
      <Textarea />
      <Textarea rows={3} />
      <Textarea rows={2} />
    </div>
  );
}
