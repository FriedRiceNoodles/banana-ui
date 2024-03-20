/**
 * title: 一次显示多个slides，并且循环。
 * debug: true
 */

import { Carousel } from '@banana-ui/react';

export default function CarouselDemo3() {
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
      <Carousel slidesPerView={3} loop>
        <div className="demo-slide">1</div>
        <div className="demo-slide">2</div>
        <div className="demo-slide">3</div>
        <div className="demo-slide">4</div>
        <div className="demo-slide">5</div>
      </Carousel>
    </div>
  );
}
