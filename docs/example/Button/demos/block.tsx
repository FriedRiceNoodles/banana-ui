/**
 * title: 块级按钮
 * description: 使用`block`属性，使按钮变成块级按钮。
 */

import { Button } from '@banana-ui/react';

export default function Block() {
  return (
    <div>
      <Button block type="primary">
        块级按钮
      </Button>
    </div>
  );
}
