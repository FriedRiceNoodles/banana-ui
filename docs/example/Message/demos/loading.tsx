/**
 * title: loading提示
 * description: 将 `duration` 配置为0，提示将不会自动关闭，需要自行调用 `closeMessage` 方法关闭。
 */

import { Button, Message } from '@banana-ui/react';

export default function Loading() {
  return (
    <Button
      onClick={() => {
        const messageId = Message.loading({ content: '正在加载...', duration: 0 });
        setTimeout(() => {
          Message.closeMessage(messageId);
        }, 5000);
      }}
    >
      显示一个loading提示
    </Button>
  );
}
