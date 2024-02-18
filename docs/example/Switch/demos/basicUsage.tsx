import * as React from 'react';
/**
 * title: 基本使用
 */

import { Switch } from '@banana/banana-react';

export default function BasicUsage() {
  return (
    <div>
      <Switch>
        <span slot="checked">open</span>
        <span slot="unchecked">unOpen</span>
      </Switch>
    </div>
  );
}
