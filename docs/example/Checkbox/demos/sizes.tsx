/**
 * title: 尺寸
 * description: Checkbox 组件提供了三种尺寸，分别为 `small`、`medium`、`large`，默认为 `medium`。
 */

import { Checkbox } from '@banana/banana-react';
import React from 'react';

export default function sizes() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 20,
      }}
    >
      <Checkbox size="small">small</Checkbox>
      <Checkbox>medium (default)</Checkbox>
      <Checkbox size="large">large</Checkbox>
    </div>
  );
}
