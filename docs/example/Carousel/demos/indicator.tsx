/**
 * title: 指示器
 * description: 使用`indicator`参数控制指示器的显示。你可以通过`css变量`来改变指示器的样式。
 */

import { Carousel } from '@banana-ui/react';

export default function Indicator() {
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
      <Carousel indicator>
        <div className="demo-slide">1</div>
        <div className="demo-slide">2</div>
        <div className="demo-slide">3</div>
        <div className="demo-slide">4</div>
        <div className="demo-slide">5</div>
      </Carousel>
    </>
  );
}
