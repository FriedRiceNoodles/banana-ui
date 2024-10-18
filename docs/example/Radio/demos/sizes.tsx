/**
 * title: 尺寸
 * description: Radio 组件提供了三种尺寸，分别为 `small`、`medium`、`large`，默认为 `medium`。
 */

import { Radio, RadioGroup } from '@banana-ui/react';
import React from 'react';

export default function sizes() {
  return (
    <div>
      <RadioGroup defaultValue="medium">
        <Radio size="small" value="small">
          small
        </Radio>
        <Radio value="medium">medium (default)</Radio>
        <Radio size="large" value="large">
          large
        </Radio>
      </RadioGroup>
    </div>
  );
}
