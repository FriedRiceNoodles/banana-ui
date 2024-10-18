/**
 * title: 使用useRef手动改变currentIndex
 * debug: true
 */

/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Button, Carousel } from '@banana-ui/react';
import { useRef } from 'react';

export default function CarouselDemo0() {
  const carousel = useRef(null);

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
      <Carousel ref={carousel} slidesPerView={5} loop gap={20}>
        <div className="demo-slide">1</div>
        <div className="demo-slide">2</div>
        <div className="demo-slide">3</div>
        <div className="demo-slide">4</div>
        <div className="demo-slide">5</div>
        <div className="demo-slide">6</div>
        <div className="demo-slide">7</div>
        <div className="demo-slide">8</div>
        <div className="demo-slide">9</div>
        <div className="demo-slide">10</div>
      </Carousel>

      <Button onclick={() => carousel.current?.goto(0)}>go 1</Button>
      <Button onclick={() => carousel.current?.goto(9)}>go 10</Button>
    </>
  );
}
