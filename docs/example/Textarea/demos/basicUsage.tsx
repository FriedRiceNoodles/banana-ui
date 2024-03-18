/**
 * title: 基本使用
 */

import { Textarea } from '@banana-ui/react';

export default function BasicUsage() {
  return (
    <div>
      <Textarea placeholder="Basic usage" />
      <Textarea placeholder="Custom placeholder" />
      <Textarea placeholder="Disabled" disabled />
    </div>
  );
}
