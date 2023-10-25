/**
 * title: 自定义颜色
 * description: 通过 `color` 属性可以自定义内容的文字颜色。
 */

import { Marquee } from '@banana/banana-react';
import React from 'react';

export default function CustomColor() {
  const content =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

  return (
    <div>
      <Marquee content={content} color="orange" />
      <Marquee content={content} color="#BB4430" />
      <Marquee content={content} color="rgba(0,0,0,.5)" />
    </div>
  );
}
