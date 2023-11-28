/**
 * title: onChange回调事件
 */
import { Message, Stepper } from '@banana/banana-react';
import React from 'react';

export default function StepChange() {
  return (
    <div>
      <Stepper
        value={4}
        onChange={(e) => {
          const event = e as CustomEvent<{ value: string }>;
          Message.info({ content: `current stepper value：${event.detail.value}` });
        }}
      />
    </div>
  );
}
