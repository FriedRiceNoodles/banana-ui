/**
 * title: 基本使用
 */

import { Carousel } from '@banana-ui/react';

export default function BasicUsage() {
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
    <>
      <style>{style}</style>
      <Carousel>
        <div className="demo-slide">1</div>
        <div className="demo-slide">2</div>
        <div className="demo-slide">3</div>
        <div className="demo-slide">4</div>
        <div className="demo-slide">5</div>
      </Carousel>
    </>
  );
}
