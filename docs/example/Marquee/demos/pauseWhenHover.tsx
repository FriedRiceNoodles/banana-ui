/**
 * title: hover暂停
 * description: 通过 `pauseWhenHover` 属性可以控制鼠标悬停时是否暂停滚动。
 */

import { Marquee } from '@banana/banana-react';
import React from 'react';

export default function PauseWhenHover() {
  const content =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

  return (
    <div>
      <Marquee content={content} pauseWhenHover />
    </div>
  );
}
