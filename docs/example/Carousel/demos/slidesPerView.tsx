/**
 * title: 一次显示多个slides
 * description: 使用`slidesPerView`参数，实现一次显示多个slides。
 */

import { Carousel } from '@banana-ui/react';

export default function SlidesPerView() {
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
      <Carousel slidesPerView={3}>
        <div className="demo-slide">1</div>
        <div className="demo-slide">2</div>
        <div className="demo-slide">3</div>
        <div className="demo-slide">4</div>
        <div className="demo-slide">5</div>
      </Carousel>
    </div>
  );
}
