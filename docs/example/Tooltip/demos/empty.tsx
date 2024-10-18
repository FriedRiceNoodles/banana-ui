/**
 * title: 隐藏Tooltip
 * description: 当 `content` 为空时，Tooltip 不会展示。基于这一特性，可以通过将 `content` 设置为 `''` 来隐藏 Tooltip。
 */

import { Button, Tooltip } from '@banana-ui/react';
import React from 'react';

export default function Empty() {
  const [visible, setVisible] = React.useState(false);

  return (
    <div>
      <Button onClick={() => setVisible(!visible)}>{visible ? 'Hide' : 'Show'}</Button>
      <Tooltip content={visible ? 'This is a tooltip.' : ''}>
        <span>Hover me!</span>
      </Tooltip>
    </div>
  );
}
