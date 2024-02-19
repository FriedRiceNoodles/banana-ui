/**
 * title: 块级按钮
 * description: 使用`block`属性，使按钮变成块级按钮。
 */

import { Button } from '@banana-ui/react';
import React from 'react';

export default function ButtonDemo7() {
  return (
    <div>
      <Button block type="primary">
        块级按钮
      </Button>
    </div>
  );
}
