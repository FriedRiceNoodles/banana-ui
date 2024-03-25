/**
 * title: 尺寸
 * description: Switch 组件提供了`small`、`default`、默认为 `default`两种尺寸。还可以通过修改CSS变量来自定义大小。
 */

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
      <Switch size="small"></Switch>
      <Switch></Switch>
      <span>自定义尺寸</span>
      <Switch
        style={
          {
            '--banana-switch-width': '60px',
            '--banana-switch-height': '28px',
            '--banana-switch-control-size': '24px',
          } as React.CSSProperties
        }
      ></Switch>
    </div>
  );
}
