/**
 * title: 基本使用
 */

import { Select, SelectOption } from '@banana/banana-react';
import React from 'react';

export default function BasicUsage() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      <Select placeholder="Choose a fruit" style={{ width: '150px' }}>
        <SelectOption value="apple">🍎 Apple</SelectOption>
        <SelectOption value="banana">🍌 Banana</SelectOption>
        <SelectOption value="orange">🍊 Orange</SelectOption>
        <SelectOption value="pear">🍐 Pear</SelectOption>
        <SelectOption value="grape">🍇 Grape</SelectOption>
        <SelectOption value="disabled" disabled>
          🚫 Disabled
        </SelectOption>
      </Select>

      <Select defaultValue={'apple'} placeholder="Choose a fruit" style={{ width: '150px' }}>
        <SelectOption value="apple">🍎 Apple</SelectOption>
        <SelectOption value="banana">🍌 Banana</SelectOption>
        <SelectOption value="orange">🍊 Orange</SelectOption>
        <SelectOption value="pear">🍐 Pear</SelectOption>
        <SelectOption value="grape">🍇 Grape</SelectOption>
        <SelectOption value="disabled" disabled>
          🚫 Disabled
        </SelectOption>
      </Select>

      <Select>
        <SelectOption value="">我是value是空的</SelectOption>
        <SelectOption value="">我是value也是空的</SelectOption>
        <SelectOption value="1">
          <h1>我包含了dom结构</h1>
        </SelectOption>
      </Select>
    </div>
  );
}
