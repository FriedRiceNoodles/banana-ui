/**
 * title: 控制输入范围
 */
import { Stepper } from '@banana/banana-react';
import React from 'react';

export default function InputRange() {
  return (
    <div>
      <Stepper value={-2} min={-1} max={5} />
    </div>
  );
}
