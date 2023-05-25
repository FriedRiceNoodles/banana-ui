/**
 * title: 禁用拖拽滑动
 * description: 使用`disableDrag`参数禁用拖拽滑动。
 */

import { Carousel } from '@banana/banana-react';
import React from 'react';

export default function disableDrag() {
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
      <Carousel disableDrag>
        <div className="demo-slide">1</div>
        <div className="demo-slide">2</div>
        <div className="demo-slide">3</div>
        <div className="demo-slide">4</div>
        <div className="demo-slide">5</div>
      </Carousel>
    </div>
  );
}
