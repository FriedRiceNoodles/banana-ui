/**
 * title: loading状态
 * description: 使用`loading`属性，使按钮变成loading状态。
 */

import { Button } from '@banana/banana-react';
import React from 'react';

export default function ButtonDemo5() {
  return (
    <div
      style={{
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
      }}
    >
      <Button type="primary" loading>
        主要按钮
      </Button>
      <Button type="success" loading>
        成功按钮
      </Button>
      <Button type="warning" loading>
        警告按钮
      </Button>
      <Button type="danger" loading>
        危险按钮
      </Button>
      <Button type="dashed" loading>
        虚线按钮
      </Button>
      <Button loading>默认按钮</Button>
    </div>
  );
}
