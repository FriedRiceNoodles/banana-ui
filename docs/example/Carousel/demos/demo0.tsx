/**
 * title: 基本使用
 */

import { Carousel } from '@banana/banana-react';
import React from 'react';

export default function CarouselDemo0() {
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
      <Carousel>
        <div className="demo-slide">1</div>
        <div className="demo-slide">2</div>
        <div className="demo-slide">3</div>
        <div className="demo-slide">4</div>
        <div className="demo-slide">5</div>
      </Carousel>
    </div>
  );
}
