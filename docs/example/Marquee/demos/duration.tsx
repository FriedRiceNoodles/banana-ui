/**
 * title: 滚动时长
 * description: 通过 `duration` 属性可以自定义滚动时长，从而控制滚动速度。
 */

import { Marquee } from '@banana-ui/react';

export default function Duration() {
  const content =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

  return (
    <>
      <Marquee content={content} duration={30} />
      <Marquee content={content} duration={10} />
    </>
  );
}
