/**
 * title: 禁用
 * description: 可设置某个单选框为禁用状态，或者禁用整个 RadioGroup。
 */

import { Radio, RadioGroup } from '@banana-ui/react';

export default function Disabled() {
  return (
    <div>
      <RadioGroup>
        <Radio value="banana">Banana🍌</Radio>
        <Radio value="apple">Apple🍎</Radio>
        <Radio value="cherry" disabled>
          Cherry🍒
        </Radio>
      </RadioGroup>

      <RadioGroup disabled value="banana">
        <Radio value="banana">Banana🍌</Radio>
        <Radio value="apple">Apple🍎</Radio>
        <Radio value="cherry">Cherry🍒</Radio>
      </RadioGroup>
    </div>
  );
}
