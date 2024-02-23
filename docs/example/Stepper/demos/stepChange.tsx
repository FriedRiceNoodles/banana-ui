/**
 * title: onChange回调事件
 */
import { Message, Stepper } from '@banana-ui/react';
import React, { useRef, useState } from 'react';

export default function StepChange() {
  const [value, setValue] = useState(0);
  const stepper = useRef(null);
  return (
    <div>
      <Stepper
        ref={stepper}
        value={value}
        controlled
        onChange={(e) => {
          if (e.composedPath()[0] === stepper.current) {
            const event = e;

            Message.info({ content: `current stepper value：${event.detail.value}` });
            setValue(Number(event.detail.value));
          }
        }}
      />
    </div>
  );
}
