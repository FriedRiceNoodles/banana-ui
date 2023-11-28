/**
 * title: 基本使用
 */
import { Stepper } from '@banana/banana-react';
import React from 'react';

export default function BasicUsage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <Stepper value={1} />
      <Stepper value={1} disabled />
    </div>
  );
}
