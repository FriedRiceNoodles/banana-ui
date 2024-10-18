/**
 * title: 自动调整高度
 * description: 使用`autoHeight`参数开启自动调整高度。
 */

import { Carousel } from '@banana-ui/react';

export default function autoHeight() {
  const style = `
      .autoheight .demo-slide {
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(to bottom right, #5193e9, #0e61cd);
        color: #fff;
        font-size: 48px;
      }

      .autoheight .demo-slide:nth-child(2n) {
        background: linear-gradient(to bottom right, #0e61cd, #5193e9);
        height: 500px;
      }
    `;

  return (
    <div className="autoheight">
      <style>{style}</style>
      <Carousel navigation autoHeight>
        <div className="demo-slide">1</div>
        <div className="demo-slide">2</div>
        <div className="demo-slide">3</div>
        <div className="demo-slide">4</div>
        <div className="demo-slide">5</div>
      </Carousel>
    </div>
  );
}
