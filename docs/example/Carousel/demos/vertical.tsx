/**
 * title: 垂直展示
 * description: 当需要垂直展示时，需要手动指定容器高度(设置对应css变量`--banana-carousel-vertical-height`)
 */

import { Carousel } from '@banana-ui/react';

export default function Vertical() {
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
      <Carousel className="container" vertical>
        <div className="demo-slide--vertical">1</div>
        <div className="demo-slide--vertical">2</div>
        <div className="demo-slide--vertical">3</div>
        <div className="demo-slide--vertical">4</div>
        <div className="demo-slide--vertical">5</div>
      </Carousel>
    </>
  );
}
