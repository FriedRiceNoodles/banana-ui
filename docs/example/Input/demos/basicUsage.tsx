/**
 * title: 基本使用
 */

import { Input } from '@banana-ui/react';
import React from 'react';

export default function BasicUsage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <Input placeholder="Basic usage" />
      <Input placeholder="Custom placeholder" />
      <Input placeholder="Disabled" disabled />
    </div>
  );
}
