/**
 * title: 表单测试
 * debug: true
 */

import { Button, Input } from '@banana/banana-react';
import React from 'react';

export default function FormTest() {
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
        <Button name="submit" value="haha" htmlType="submit">
          submit
        </Button>
        <Button htmlType="reset">reset</Button>
        <button type="submit">native submit</button>
      </form>
    </div>
  );
}
