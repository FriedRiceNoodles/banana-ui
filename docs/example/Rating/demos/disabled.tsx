/**
 * title: 禁用评分
 * description: 禁用状态下无法进行交互，同时会有不同的样式，且**不会参与表单提交**。
 */

import { Rating } from '@banana/banana-react';
import React from 'react';

export default function Disabled() {
  return (
    <div>
      <Rating disabled defaultValue={3}></Rating>
    </div>
  );
}
