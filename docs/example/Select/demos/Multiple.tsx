/**
 * title: 多选
 * description: 设置 `multiple` 属性可以开启多选模式。
 */

import { Select, SelectOption } from '@banana/banana-react';
import React from 'react';

export default function Multiple() {
  const handleChange = (e: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    console.log(e.detail.value);
  };
  return (
    <div>
      <Select onChange={handleChange} multiple style={{ width: '100%' }} defaultValue={['grape', 'orange']}>
        <SelectOption value="apple">
          🍎 AppleAppleAppleAppleAppleAppleAppleAppleAppleAppleAppleAppleAppleAppleAppleApple
        </SelectOption>
        <SelectOption value="banana">🍌 Banana</SelectOption>
        <SelectOption value="orange">🍊 Orange</SelectOption>
        <SelectOption value="pear">🍐 Pear</SelectOption>
        <SelectOption value="grape">🍇 Grape</SelectOption>
        <SelectOption value="strawberry">🍓 Strawberry</SelectOption>
        <SelectOption value="pineapple">🍍 Pineapple</SelectOption>
        <SelectOption value="cherry">🍒 Cherry</SelectOption>
        <SelectOption value="disabled" disabled>
          🚫 Disabled
        </SelectOption>
      </Select>
    </div>
  );
}
