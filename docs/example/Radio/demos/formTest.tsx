/**
 * title: 表单测试
 * debug: true
 */

import { Button, Radio, RadioGroup } from '@banana/banana-react';
import React, { useState } from 'react';

export default function FormTest() {
  const [controlledValue, setControlledValue] = useState('banana');

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value as string}`);
          }
        }}
      >
        normal
        <RadioGroup name="radio-group">
          <Radio value="banana">Banana🍌</Radio>
          <Radio value="apple">Apple🍎</Radio>
          <Radio value="cherry">Cherry🍒</Radio>
        </RadioGroup>
        disabled
        <RadioGroup name="radio-group-disabled" disabled>
          <Radio value="banana">Banana🍌</Radio>
          <Radio value="apple">Apple🍎</Radio>
          <Radio value="cherry">Cherry🍒</Radio>
        </RadioGroup>
        required
        <RadioGroup name="radio-group-required" required>
          <Radio value="banana">Banana🍌</Radio>
          <Radio value="apple">Apple🍎</Radio>
          <Radio value="cherry">Cherry🍒</Radio>
        </RadioGroup>
        controlled
        <RadioGroup
          name="radio-group-controlled"
          value={controlledValue}
          defaultValue={'cherry'}
          controlled
          onChange={(e: any) => {
            console.log(e);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
            setControlledValue(e.detail.value);
          }}
        >
          <Radio value="banana">Banana🍌</Radio>
          <Radio value="apple">Apple🍎</Radio>
          <Radio value="cherry">Cherry🍒</Radio>
        </RadioGroup>
        readonly
        <RadioGroup name="radio-group-readonly" readonly defaultValue="banana">
          <Radio value="banana">Banana🍌</Radio>
          <Radio value="apple">Apple🍎</Radio>
          <Radio value="cherry">Cherry🍒</Radio>
        </RadioGroup>
        <Button type="primary" htmlType="submit">
          submit
        </Button>
        <Button htmlType="reset">reset</Button>
      </form>
    </div>
  );
}
