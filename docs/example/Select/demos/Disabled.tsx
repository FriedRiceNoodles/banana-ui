/**
 * title: 禁用的选择器
 * description: 设置 `disabled` 属性可以让选择器禁用。
 */

import { Select, SelectOption } from '@banana/banana-react';
import React from 'react';

export default function Disabled() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      <Select placeholder="Choose a fruit" style={{ width: '100%' }} clearable disabled>
        <SelectOption value="apple">🍎 Apple</SelectOption>
        <SelectOption value="banana">🍌 Banana</SelectOption>
        <SelectOption value="orange">🍊 Orange</SelectOption>
        <SelectOption value="pear">🍐 Pear</SelectOption>
        <SelectOption value="grape">🍇 Grape</SelectOption>
        <SelectOption value="disabled" disabled>
          🚫 Disabled
        </SelectOption>
      </Select>

      <Select
        placeholder="Choose a fruit"
        style={{ width: '100%' }}
        defaultValue={['apple', 'banana']}
        multiple
        clearable
        disabled
      >
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
