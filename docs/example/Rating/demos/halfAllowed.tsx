/**
 * title: 允许半星
 * description: 设置 `halfAllowed` 参数即可选中半星。
 */

import { Rating } from '@banana-ui/react';
import React from 'react';

export default function HalfAllowed() {
  return (
    <div>
      <Rating defaultValue={2.5} halfAllowed />
    </div>
  );
}
