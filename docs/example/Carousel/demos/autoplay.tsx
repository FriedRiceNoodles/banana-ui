/**
 * title: 自动轮播
 * description: 使用`autoplay`参数开启自动轮播，使用`autoplayDelay`参数可以修改自动轮播的事件间隔。
 */

import { Carousel } from '@banana-ui/react';
import React from 'react';

export default function autoplay() {
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
      <Carousel autoplay autoplayDelay={5000} loop>
        <div className="demo-slide">1</div>
        <div className="demo-slide">2</div>
        <div className="demo-slide">3</div>
        <div className="demo-slide">4</div>
        <div className="demo-slide">5</div>
      </Carousel>
    </div>
  );
}
