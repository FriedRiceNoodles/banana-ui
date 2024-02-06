/**
 * title: 按钮状态
 * description: 可以设置默认的Footer按钮为Loading或者Disabled状态。
 */

import { Button, Message, Modal } from '@banana/banana-react';
import React, { useState } from 'react';

export default function ButtonStatus() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        自定义按钮状态
      </Button>
      <Modal
        open={visible}
        onCancel={() => setVisible(false)}
        onOk={() => {
          if (loading) return;
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            setVisible(false);
            Message.success({
              content: 'OK~',
            });
          }, 3000);
        }}
        title="I am a Modal~"
        okButtonLoading={loading}
        cancelButtonDisabled={loading}
      >
        <div>Some contents...</div>
        <div>Some contents...</div>
        <div>Some contents...</div>
      </Modal>
    </div>
  );
}
