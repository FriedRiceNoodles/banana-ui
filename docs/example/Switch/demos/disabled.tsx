/**
 * title: 禁用状态
 */

import { Switch } from '@banana-ui/react';

export default function Disabled() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
      }}
    >
      <Switch disabled></Switch>
      <Switch disabled checked></Switch>
    </div>
  );
}
