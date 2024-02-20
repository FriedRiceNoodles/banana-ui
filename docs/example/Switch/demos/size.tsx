/**
 * title: 尺寸
 */
import * as React from 'react';

import { Switch } from '@banana-ui/react';

export default function BasicUsage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
      }}
    >
      <Switch></Switch>
      <Switch size="small"></Switch>
    </div>
  );
}
