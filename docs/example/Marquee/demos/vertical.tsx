/**
 * title: 垂直滚动
 * description: 传入 `vertical` 属性后，文案会垂直滚动。
 */

import { Marquee } from '@banana-ui/react';

export default function Vertical() {
  const content =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

  return (
    <Marquee
      vertical
      content={content}
      duration={10}
      style={
        {
          '--banana-marquee-height': '50px',
        } as React.CSSProperties
      }
    />
  );
}
