/**
 * title: 基本使用
 */

import { Progress } from '@banana-ui/react';
import React from 'react';

export default function BasicUsage() {
  return (
    <div>
      <Progress />
      <Progress percent={20} />
      <Progress percent={50} />
      <Progress percent={100} />
    </div>
  );
}
