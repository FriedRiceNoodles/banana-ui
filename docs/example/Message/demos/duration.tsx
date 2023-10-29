/**
 * title: 自定义提示的展示时长
 * description: 通过配置参数中的 `duration` 属性，可以自定义提示的展示时长，单位为秒。
 */

import { Button, Message } from '@banana/banana-react';
import React from 'react';

export default function Duration() {
  return (
    <div>
      <Button
        onClick={() => {
          Message.info({ content: '这条提示将会被展示10秒...', duration: 10 });
        }}
        type="primary"
      >
        自定义提示时长
      </Button>
    </div>
  );
}
