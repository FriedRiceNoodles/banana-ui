/**
 * title: 按钮文本
 * description: 通过`okText`和`cancelText`属性可以自定义弹窗/对话框的按钮文本。
 */

import { Button, Message, Modal } from '@banana-ui/react';
import { useState } from 'react';

export default function ButtonText() {
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
        title="会员畅享内容"
        okText="没问题！"
        cancelText="算了"
      >
        是否开通连续包月？
      </Modal>
    </>
  );
}
