/**
 * title: 最大宽度
 */

import { Button, Tooltip } from '@banana-ui/react';
import React from 'react';

export default function MaxWidth() {
  const content = 'This is a long long long long long long tooltip.';
  return (
    <>
      你可以通过<code>maxWidth</code>参数设置最大宽度。
      <p style={{ display: 'flex', gap: '8px' }}>
        <Tooltip content={content} maxWidth={100}>
          <Button>Hover me!</Button>
        </Tooltip>
        <Tooltip content={content} maxWidth={'10em'}>
          <Button>Hover me!</Button>
        </Tooltip>
      </p>
      也可以通过<code>css变量</code>来实现这一点
      <p>
        <Tooltip content={content} style={{ '--banana-tooltip-max-width': '100px' } as React.CSSProperties}>
          <Button>Hover me!</Button>
        </Tooltip>
      </p>
    </>
  );
}
