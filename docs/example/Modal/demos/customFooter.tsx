/**
 * title: 自定义Footer
 * description: 可以通过插槽(`slot`)自定义Footer。
 */

import { Button, Message, Modal } from '@banana-ui/react';
import React, { useState } from 'react';

export default function CustomFooter() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        自定义Footer
      </Button>
      <Modal open={visible} title="删除数据" onCancel={() => setVisible(false)}>
        <p>是否删除数据？</p>
        <div slot="footer">
          <Button onClick={() => setVisible(false)} style={{ marginRight: '10px' }}>
            取消
          </Button>
          <Button
            type="danger"
            onClick={() => {
              setVisible(false);
              Message.success({
                content: '已删除数据',
              });
            }}
          >
            删除
          </Button>
        </div>
      </Modal>
    </div>
  );
}
