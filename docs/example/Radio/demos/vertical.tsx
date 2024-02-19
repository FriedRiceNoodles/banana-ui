/**
 * title: 垂直模式
 * description: RadioGroup 组件默认为水平布局，可以设置 `vertical` 属性使其变为垂直布局。
 */

import { Radio, RadioGroup } from '@banana-ui/react';
import React from 'react';

export default function Vertical() {
  return (
    <div>
      <RadioGroup vertical>
        <Radio value="banana">Banana 🍌</Radio>
        <Radio value="apple">Apple 🍎</Radio>
        <Radio value="cherry">Cherry 🍒</Radio>
      </RadioGroup>
    </div>
  );
}
