/**
 * title: 携带内容
 */

import * as React from 'react';

import { Switch } from '@banana-ui/react';

export default function WithContent() {
  return (
    <div>
      <Switch>
        <span slot="checked">开启</span>
        <span slot="unchecked">关闭</span>
      </Switch>
    </div>
  );
}
