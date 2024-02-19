/**
 * title: 溢出内容
 * description: 为了保证Modal的Header和Footer能始终显示在视窗内，当Modal内容过多时，Modal会自动出现滚动条。
 */

import { Button, Message, Modal } from '@banana-ui/react';
import React, { useState } from 'react';

export default function Overflow() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        Open Modal
      </Button>
      <Modal
        open={visible}
        onCancel={() => setVisible(false)}
        onOk={() => {
          setVisible(false);
          Message.success({
            content: 'OK~',
          });
        }}
        title="I am a Modal~"
      >
        <div style={{ padding: '30px 20px', border: '1px dashed #ccc' }}>
          <div style={{ height: '200vh' }}>往下滚动试试~👇🏻👇👇🏻👇👇🏻👇</div>
          <span>Hi~ o(*￣▽￣*)ブ</span>
        </div>
      </Modal>
    </div>
  );
}
