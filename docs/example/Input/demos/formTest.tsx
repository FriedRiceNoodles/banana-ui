/**
 * title: 表单测试
 * debug: true
 */

import { Button, Input } from '@banana-ui/react';
import React from 'react';

export default function FormTest() {
  const [controlledInputValue, setControlledInputValue] = React.useState('controlled');

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
        <Input type="text" name="username" value="789" />
        <Input type="password" name="password" />
        <Input type="text" name="test" value="123" disabled />
        <Input type="email" name="email" required placeholder="required email" />
        <Input
          controlled
          type="text"
          name="controlled"
          value={controlledInputValue}
          placeholder="controlled input"
          onChange={(e: any) => {
            console.log('change');
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
            setControlledInputValue(e.detail.value);
          }}
        />
        <Button name="submit" value="haha" htmlType="submit">
          submit
        </Button>
        <Button htmlType="reset">reset</Button>
        <button type="submit">native submit</button>
        <Button
          onClick={() => {
            setControlledInputValue('123');
          }}
        >
          change the value of controlled input to '123'
        </Button>
      </form>
    </div>
  );
}
