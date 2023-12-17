/**
 * title: 背景色
 */

import { Button, Tooltip } from '@banana/banana-react';
import React from 'react';

export default function BackgroundColor() {
  return (
    <>
      你可以通过 <code>backgroundColor</code> 参数设置背景色。
      <p style={{ display: 'flex', gap: '8px' }}>
        <Tooltip content="This is a tooltip." backgroundColor="maroon">
          <Button>maroon</Button>
        </Tooltip>
        <Tooltip content="This is a tooltip." backgroundColor="#015AE0">
          <Button>#015AE0</Button>
        </Tooltip>
        <Tooltip content="This is a tooltip." backgroundColor="rgb(16, 145, 11)">
          <Button>rgb(16, 145, 11)</Button>
        </Tooltip>
      </p>
      也可以通过<code>css变量</code>来实现这一点
      <p style={{ display: 'flex', gap: '8px' }}>
        <Tooltip
          content="This is a tooltip."
          style={{ '--banana-tooltip-background-color': 'maroon' } as React.CSSProperties}
        >
          <Button>marron</Button>
        </Tooltip>
        <Tooltip
          content="This is a tooltip."
          style={{ '--banana-tooltip-background-color': '#015AE0' } as React.CSSProperties}
        >
          <Button>#015AE0</Button>
        </Tooltip>
        <Tooltip
          content="This is a tooltip."
          style={{ '--banana-tooltip-background-color': 'rgb(16, 145, 11)' } as React.CSSProperties}
        >
          <Button>rgb(16, 145, 11)</Button>
        </Tooltip>
      </p>
    </>
  );
}
