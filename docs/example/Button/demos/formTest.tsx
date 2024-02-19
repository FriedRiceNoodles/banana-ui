/**
 * title: 表单测试
 * debug: true
 */

import { Button } from '@banana-ui/react';
import React from 'react';

export default function ButtonDemo0() {
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
        <input type="text" name="username" />
        <input type="password" name="password" />
        <Button name="submit" value="haha" htmlType="submit">
          submit
        </Button>
        <Button htmlType="reset">reset</Button>
      </form>
    </div>
  );
}
