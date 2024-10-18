/**
 * title: 基本使用
 */

import { Textarea } from '@banana-ui/react';

export default function BasicUsage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <Textarea />
      <Textarea placeholder="Custom placeholder" />
      <Textarea placeholder="Disabled" disabled />
    </div>
  );
}
