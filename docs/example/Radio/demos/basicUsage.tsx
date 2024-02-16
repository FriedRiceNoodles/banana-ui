/**
 * title: 基本使用
 */

import { Radio, RadioGroup } from '@banana/banana-react';
import React from 'react';

export default function BasicUsage() {
  return (
    <div>
      <RadioGroup>
        <Radio value="banana">Banana 🍌</Radio>
        <Radio value="apple">Apple 🍎</Radio>
      </RadioGroup>
    </div>
  );
}
