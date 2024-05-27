/**
 * title: 自定义样式
 * description: 你可以使用组件暴露出来的`CSS变量`和`part`属性来实现更细粒度的自定义样式。
 */

import { Marquee } from '@banana-ui/react';
import React from 'react';

export default function CustomStyle() {
  const content =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

  const style = `
    .foo::part(base) {
      background-color: rgba(255, 0, 0, 0.8 );
      padding: 10px 0;
      color: #fff;
      font-family: "Gill Sans", sans-serif;
    }
    .cat::part(content) {
      border-radius: 10px;
    }
  `;

  return (
    <>
      <style>{style}</style>
      <div>
        <Marquee
          content={content}
          style={
            {
              '--banana-marquee-color': 'orange',
              '--banana-marquee-font-size': '12px',
              '--banana-marquee-line-height': '2',
              '--banana-marquee-background-color': 'rgba(0,0,0,.5)',
            } as React.CSSProperties
          }
        />
        <Marquee content={content} className="foo" />
        <Marquee content={content} className="cat" />
      </div>
    </>
  );
}
