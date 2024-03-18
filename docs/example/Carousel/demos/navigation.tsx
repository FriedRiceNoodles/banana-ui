/**
 * title: 箭头按钮
 * description: 使用`navigation`参数控制箭头按钮的显示，点击箭头按钮可以使轮播图跳到上一张或下一张。
 */

import { Carousel } from '@banana-ui/react';

export default function Navigation() {
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
      <Carousel navigation>
        <div className="demo-slide">1</div>
        <div className="demo-slide">2</div>
        <div className="demo-slide">3</div>
        <div className="demo-slide">4</div>
        <div className="demo-slide">5</div>
      </Carousel>
    </>
  );
}
