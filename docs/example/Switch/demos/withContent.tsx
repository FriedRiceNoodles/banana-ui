/**
 * title: 携带内容
 */

import * as React from 'react';

import { Switch } from '@banana-ui/react';

export default function WithContent() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
      }}
    >
      <Switch>
        <span slot="checked">开启</span>
        <span slot="unchecked">关闭</span>
      </Switch>
      <Switch>
        <span slot="checked">1</span>
        <span slot="unchecked">0</span>
      </Switch>
    </div>
  );
}
