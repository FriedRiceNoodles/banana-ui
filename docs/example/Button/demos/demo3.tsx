/**
 * title: 药丸形状的按钮
 * description: 使用`pill`属性，可以得到一个圆润的按钮。
 */

import { Button } from '@banana-ui/react';
import React from 'react';

export default function ButtonDemo3() {
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
