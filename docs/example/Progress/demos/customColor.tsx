/**
 * title: 自定义进度条和背景颜色
 */

import { Progress } from '@banana/banana-react';
import React from 'react';

export default function CustomColor() {
  return (
    <div>
      你可以使用 <code>color</code> 参数和 <code>backgroundColor</code> 参数来自定义进度条和背景颜色。
      <Progress percent={50} color="rgb(224, 47, 37)" backgroundColor="rgba(224, 47, 37, 0.3)" />
      当然你也可以实现一个渐变的进度条：
      <Progress percent={50} color="linear-gradient(to right, #FFD700, #FFA500)" backgroundColor="linear-gradient(to right, #FFFACD, #FFD700)" />
      你还可以使用 <code>css变量</code> 来自定义进度条和背景颜色。
      <Progress
        percent={50}
        style={{ '--banana-progress-color': 'rgb(224, 47, 37)', '--banana-progress-background-color': 'rgba(224, 47, 37, 0.3)' } as React.CSSProperties}
      />
    </div>
  );
}
