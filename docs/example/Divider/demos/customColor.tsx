/**
 * title: 自定义颜色
 */

import { Divider } from '@banana-ui/react';
import React from 'react';

export default function customWidth() {
  return (
    <div>
      <p>
        你可以使用<code>color</code>参数自定义分割线的颜色：
      </p>
      <Divider color="red" />
      <Divider color="#00ff00" />
      <br />
      <p>也可以通过css变量的方式自定义分割线的颜色：</p>
      <Divider style={{ '--banana-divider-color': '#00f' } as React.CSSProperties} />
    </div>
  );
}
