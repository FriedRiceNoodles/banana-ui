/**
 * title: 表单测试
 * debug: true
 */

import { Button, Select, SelectOption } from '@banana-ui/react';
import React from 'react';

export default function FormTest() {
  const [controlledInputValue, setControlledInputValue] = React.useState(['apple']);

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
        <Select placeholder="Choose a fruit" style={{ width: '100%' }} name="fruit1" required>
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
          placeholder="multiple"
          style={{ width: '100%' }}
          multiple
          name="fruit2"
          defaultValue={['apple', 'banana']}
          required
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
        <Select
          placeholder="controlled"
          style={{ width: '100%' }}
          controlled
          multiple
          value={controlledInputValue}
          name="controlled fruit"
          onChange={(e: any) => {
            console.log('change');
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
            setControlledInputValue(e.detail.value);
          }}
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
        <Button name="submit" value="haha" htmlType="submit">
          submit
        </Button>
        <Button htmlType="reset">reset</Button>
        <button type="submit">native submit</button>
        <Button
          onClick={() => {
            setControlledInputValue(['pear']);
          }}
        >
          change the value of controlled input to 'pear'
        </Button>
      </form>
    </div>
  );
}
