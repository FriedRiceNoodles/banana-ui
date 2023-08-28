/**
 * title: 表单测试
 */

import { Button, Rating } from '@banana/banana-react';
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
        <Rating name="rating1" required value={3} defaultValue={4}></Rating>
        <Button name="submit" value="haha" htmlType="submit">
          submit
        </Button>
        <Button htmlType="reset">reset</Button>
      </form>
    </div>
  );
}
