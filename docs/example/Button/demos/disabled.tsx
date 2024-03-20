/**
 * title: 禁用按钮
 * description: 使用`disabled`属性，使按钮变成禁用状态。
 */

import { Button } from '@banana-ui/react';

export default function Disabled() {
  return (
    <div
      style={{
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
      }}
    >
      <Button type="primary" disabled>
        主要按钮
      </Button>
      <Button type="success" disabled>
        成功按钮
      </Button>
      <Button type="warning" disabled>
        警告按钮
      </Button>
      <Button type="danger" disabled>
        危险按钮
      </Button>
      <Button type="dashed" disabled>
        虚线按钮
      </Button>
      <Button disabled>默认按钮</Button>
    </div>
  );
}
