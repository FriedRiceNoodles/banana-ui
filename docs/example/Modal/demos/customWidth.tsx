/**
 * title: 自定义弹窗/对话框的宽度
 * description: 通过 `width` 属性可以自定义弹窗/对话框的宽度。
 */

import { Button, Message, Modal } from '@banana-ui/react';
import React, { useState } from 'react';

export default function CustomWidth() {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)} style={{ marginRight: '20px' }}>
        一个300px宽度的Modal
      </Button>
      <Button onClick={() => setVisible2(true)}>一个50vw宽度的Modal</Button>
      <p>你甚至可以使用`css变量`来设置宽度</p>
      <Button onClick={() => setVisible3(true)}>使用css变量设置宽度</Button>
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
        width={300}
      >
        <div>Some contents...</div>
        <div>Some contents...</div>
        <div>Some contents...</div>
      </Modal>
      <Modal
        open={visible2}
        onCancel={() => setVisible2(false)}
        onOk={() => {
          setVisible2(false);
          Message.success({
            content: 'OK~',
          });
        }}
        title="I am a Modal~"
        width="50vw"
      >
        <div>Some contents...</div>
        <div>Some contents...</div>
        <div>Some contents...</div>
      </Modal>
      <Modal
        open={visible3}
        onCancel={() => setVisible3(false)}
        onOk={() => {
          setVisible3(false);
          Message.success({
            content: 'OK~',
          });
        }}
        title="I am a Modal~"
        style={{ '--banana-modal-width': '50vw' } as React.CSSProperties}
      >
        <div>Some contents...</div>
        <div>Some contents...</div>
        <div>Some contents...</div>
      </Modal>
    </>
  );
}
