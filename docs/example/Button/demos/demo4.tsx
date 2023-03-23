/**
 * title: 轮廓按钮
 * description: 使用`outline`属性，可以得到一个背景透明的轮廓按钮。
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
        alignItems: 'center',
      }}
    >
      <Button outline type="primary">
        主要按钮
      </Button>
      <Button outline type="success">
        成功按钮
      </Button>
      <Button outline type="warning">
        警告按钮
      </Button>
      <Button outline type="danger">
        危险按钮
      </Button>
      <Button outline type="dashed">
        虚线按钮
      </Button>
      <Button outline>默认按钮</Button>
    </div>
  );
}
