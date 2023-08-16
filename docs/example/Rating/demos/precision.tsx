/**
 * title: 精确显示
 * description: 设置 `precision` 参数即可精确显示, 建议在`只读状态`下使用。
 */

import { Rating } from '@banana/banana-react';
import React from 'react';

export default function Precision() {
  return (
    <div>
      Precision
      <Rating defaultValue={2.75} precision />
      Precision & Readonly
      <Rating defaultValue={2.75} precision readonly />
    </div>
  );
}
