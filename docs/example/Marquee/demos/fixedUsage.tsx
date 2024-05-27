/**
 * title: 短文案固定
 * description: 通过 `fixed` 属性可以控制，短文案固定、长文案滚动效果。
 */

import { Marquee } from '@banana-ui/react';

export default function BasicUsage() {
  const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

  return <Marquee fixed content={content} />;
}
