/**
 * title: 基本使用
 * description: 通过`time`属性设定倒计时的总时长，单位为毫秒；使用format属性可以自定义倒计时的格式，具体格式参考下方的API。
 */

import { Countdown } from '@banana-ui/react';

export default function BasicUsage() {
  // 2 小时
  const time = 1000 * 60 * 60 * 2;

  // 2 天 2 小时 2 分钟 2 秒 2 毫秒
  const time2 = 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 60 * 2 + 1000 * 60 * 2 + 1000 * 2 + 2;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Countdown time={time} />
      <Countdown time={time} format="HH小时mm分钟ss秒SSS" />
      <Countdown time={time2} format="D 天 HH 小时 mm 分钟 ss 秒" />
    </div>
  );
}
