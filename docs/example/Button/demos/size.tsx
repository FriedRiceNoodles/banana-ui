/**
 * title: 按钮尺寸
 * description: 使用`size`属性，按钮有小、中（默认）、大三个尺寸。
 */

import { Button } from '@banana-ui/react';

export default function Size() {
  return (
    <div
      style={{
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Button size="small" type="primary">
        小按钮
      </Button>
      <Button type="primary">默认尺寸</Button>
      <Button size="large" type="primary">
        大按钮
      </Button>
    </div>
  );
}
