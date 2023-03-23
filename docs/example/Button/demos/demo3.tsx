/**
 * title: 按钮尺寸
 * description: 使用`pill`属性，可以得到一个圆润的按钮。
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
      <Button pill size="small" type="primary">
        小按钮
      </Button>
      <Button pill type="primary">
        默认尺寸
      </Button>
      <Button pill size="large" type="primary">
        大按钮
      </Button>
    </div>
  );
}
