/**
 * title: 尺寸
 * description: 通过设置 `size` 属性可以控制选择框的大小，可选值为 `small`、`medium`、`large`，默认为 `medium`。
 */

import { Select, SelectOption } from '@banana/banana-react';
import React from 'react';

export default function Size() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      <Select placeholder="Small size" size="small" style={{ width: '100%' }}>
        <SelectOption value="apple">🍎 Apple</SelectOption>
        <SelectOption value="banana">🍌 Banana</SelectOption>
        <SelectOption value="orange">🍊 Orange</SelectOption>
        <SelectOption value="pear">🍐 Pear</SelectOption>
        <SelectOption value="grape">🍇 Grape</SelectOption>
        <SelectOption value="disabled" disabled>
          🚫 Disabled
        </SelectOption>
      </Select>

      <Select placeholder="Medium size(default)" style={{ width: '100%' }}>
        <SelectOption value="apple">🍎 Apple</SelectOption>
        <SelectOption value="banana">🍌 Banana</SelectOption>
        <SelectOption value="orange">🍊 Orange</SelectOption>
        <SelectOption value="pear">🍐 Pear</SelectOption>
        <SelectOption value="grape">🍇 Grape</SelectOption>
        <SelectOption value="disabled" disabled>
          🚫 Disabled
        </SelectOption>
      </Select>

      <Select placeholder="Large size" size="large" style={{ width: '100%' }}>
        <SelectOption value="apple">🍎 Apple</SelectOption>
        <SelectOption value="banana">🍌 Banana</SelectOption>
        <SelectOption value="orange">🍊 Orange</SelectOption>
        <SelectOption value="pear">🍐 Pear</SelectOption>
        <SelectOption value="grape">🍇 Grape</SelectOption>
        <SelectOption value="disabled" disabled>
          🚫 Disabled
        </SelectOption>
      </Select>
    </div>
  );
}
