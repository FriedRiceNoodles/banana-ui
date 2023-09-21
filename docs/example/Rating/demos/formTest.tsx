/**
 * title: 表单测试
 */

import { Button, Rating } from '@banana/banana-react';
import React from 'react';

export default function FormTest() {
  const [controlledValue, setControlledValue] = React.useState(3);

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
        <Rating name="rating1" required defaultValue={4}></Rating>
        <Rating name="rating2" halfAllowed></Rating>
        <Rating name="rating-readonly" readonly></Rating>
        <Rating name="rating-disabled" disabled></Rating>
        <Rating
          name="rating-controlled"
          value={controlledValue}
          controlled
          onChange={(e: any) => {
            console.log(e);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
            setControlledValue(e.detail.value);
          }}
        ></Rating>
        <Button type="primary" htmlType="submit">
          submit
        </Button>
        <Button htmlType="reset">reset</Button>
      </form>
    </div>
  );
}
