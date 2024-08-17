/**
 * title: 短文案固定
 * description: 传入 `fixed` 属性后，如果文案宽度小于容器宽度，则文案不会滚动。
 */

import { Marquee } from '@banana-ui/react';

export default function BasicUsage() {
  const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

  return <Marquee fixed content={content} />;
}
