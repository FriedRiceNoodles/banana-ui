/**
 * title: 基本使用
 */

import { Button, Message, Modal } from '@banana-ui/react';
import { useState } from 'react';

export default function BasicUsage() {
  const [visible, setVisible] = useState(false);

  return (
    <>
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
        <div>Some contents...</div>
        <div>Some contents...</div>
        <div>Some contents...</div>
      </Modal>
    </>
  );
}
