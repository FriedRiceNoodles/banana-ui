/**
 * title: 基本使用
 */

import { Button, Message } from '@banana-ui/react';
import React from 'react';

export default function BasicUsage() {
  return (
    <div>
      <Button
        onClick={() => {
          Message.open({ content: 'Say hi~' });
        }}
        type="primary"
      >
        显示一个全局提示
      </Button>
    </div>
  );
}
