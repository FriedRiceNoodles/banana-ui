/**
 * title: 垂直方向
 */

import { Carousel } from '@banana-ui/react';

export default function VerticalMode() {
  const style = `
    .demo-slide--vertical {
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(to bottom right, #5193e9, #0e61cd);
      color: #fff;
      font-size: 48px;
    }
    .container {
      --banana-carousel-vertical-height: 300px;
    }
  `;

  return (
    <>
      <style>{style}</style>
      <Carousel className="container" indicator navigation verticalMode>
        <div className="demo-slide--vertical">1</div>
        <div className="demo-slide--vertical">2</div>
        <div className="demo-slide--vertical">3</div>
        <div className="demo-slide--vertical">4</div>
        <div className="demo-slide--vertical">5</div>
      </Carousel>
    </>
  );
}
