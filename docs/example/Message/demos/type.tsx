/**
 * title: 不同的提示类型
 */

import { Button, Message } from '@banana/banana-react';
import React from 'react';

export default function Type() {
  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      <Button
        onClick={() => {
          Message.info({ content: '一个普通提示' });
        }}
        type="primary"
      >
        普通提示
      </Button>

      <Button
        onClick={() => {
          Message.success({ content: '一个成功提示' });
        }}
        type="success"
      >
        成功提示
      </Button>

      <Button
        onClick={() => {
          Message.error({ content: '一个错误提示' });
        }}
        type="danger"
      >
        错误提示
      </Button>

      <Button
        onClick={() => {
          Message.warning({ content: '一个警告提示' });
        }}
        type="warning"
      >
        警告提示
      </Button>
    </div>
  );
}
