/**
 * title: 触发事件
 * description: 倒计时组件会在每次更新时触发`onChange`事件，可以通过该事件来获取当前的倒计时剩余时间；当倒计时结束时，会触发`onFinish`事件。
 */

import { Countdown } from '@banana/banana-react';
import React from 'react';

export default function Events() {
  const [flag, setFlag] = React.useState(false);

  const time = 10000;

  const onChange = (e: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const timeLeft = e.detail.timeLeft;
    if (timeLeft <= 5000 && !flag) {
      setFlag(true);
      console.log('倒计时将在5秒内结束。');
    }
  };

  const onFinish = () => {
    console.log('倒计时结束。');
  };

  return (
    <div>
      <Countdown time={time} onChange={onChange} onFinish={onFinish} />
    </div>
  );
}
