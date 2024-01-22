/**
 * title: 表单测试
 * debug: true
 */

import { Button, Checkbox } from '@banana/banana-react';
import React, { useState } from 'react';

export default function FormTest() {
  const [controlledValue, setControlledValue] = useState(false);

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
        <Checkbox name="rating1" required defaultChecked>
          required
        </Checkbox>
        <Checkbox name="checkbox-readonly" readonly>
          readonly
        </Checkbox>
        <Checkbox name="checkbox-disabled" disabled>
          disabled
        </Checkbox>
        <Checkbox
          name="rating-controlled"
          checked={controlledValue}
          controlled
          onChange={(e: any) => {
            console.log(e);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
            setControlledValue(e.detail.checked);
          }}
        >
          controlled
        </Checkbox>
        <Button type="primary" htmlType="submit">
          submit
        </Button>
        <Button htmlType="reset">reset</Button>
      </form>
    </div>
  );
}
