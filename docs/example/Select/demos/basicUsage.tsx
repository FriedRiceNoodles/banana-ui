/**
 * title: 基本使用
 */

import { Select, SelectOption } from '@banana-ui/react';

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

      <Select defaultValue={'pear'} placeholder="Choose a fruit" style={{ width: '150px' }}>
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
