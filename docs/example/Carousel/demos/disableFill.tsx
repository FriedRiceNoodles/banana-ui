/**
 * title: 填充行为
 * description: 当轮播图中内容的数量比`slidesPerView`参数所设置的还要少，会默认使用已有的内容充满整个轮播图。使用`disableFill`参数可以禁用这种行为。
 */

import { Carousel, Divider } from '@banana/banana-react';
import React from 'react';

export default function disableFill() {
  const style = `
       .demo-slide {
         height: 300px;
         display: flex;
         align-items: center;
         justify-content: center;
         background: linear-gradient(to bottom right, #5193e9, #0e61cd);
         color: #fff;
         font-size: 48px;
       }
     `;

  return (
    <div>
      <style>{style}</style>
      <Carousel slidesPerView={3} gap={50}>
        <div className="demo-slide">1</div>
        <div className="demo-slide">2</div>
      </Carousel>

      <Divider />

      <Carousel slidesPerView={3} disableFill gap={50}>
        <div className="demo-slide">1</div>
        <div className="demo-slide">2</div>
      </Carousel>
    </div>
  );
}
