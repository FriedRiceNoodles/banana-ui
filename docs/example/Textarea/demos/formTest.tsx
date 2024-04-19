/**
 * title: 表单测试
 * debug: true
 */

import { Button, Textarea } from '@banana-ui/react';
import React from 'react';

export default function FormTest() {
  const [controlledInputValue, setControlledInputValue] = React.useState('controlled');

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          console.log('formData.entries()', formData.entries());

          for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value as string}`);
          }
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <Textarea name="username" rows={2} value="789" />
        <Textarea name="password" rows={2} />
        <Textarea name="test" value="123" rows={2} disabled />
        <Textarea name="email" rows={2} required placeholder="required email" />
        <Textarea
          controlled
          name="controlled"
          value={controlledInputValue}
          rows={2}
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
