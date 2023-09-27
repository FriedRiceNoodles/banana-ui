/**
 * title: 基本使用
 */

import { Select, SelectOption } from '@banana/banana-react';
import React from 'react';

export default function BasicUsage() {
  return (
    <div>
      <Select>
        <SelectOption value="apple">🍎 Apple</SelectOption>
        <SelectOption value="banana">🍌 Banana</SelectOption>
        <SelectOption value="orange">🍊 Orange</SelectOption>
        <SelectOption value="pear">🍐 Pear</SelectOption>
        <SelectOption value="grape">🍇 Grape</SelectOption>
        <SelectOption value="disabled" disabled>
          🚫 Disabled
        </SelectOption>
      </Select>

      <Select defaultValue={'apple'}>
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
