/**
 * title: 只读
 * description: 使用 `readonly` 参数即可设置为只读，只读状态下无法进行交互。
 */

import { Rating } from '@banana/banana-react';
import React from 'react';

export default function Readonly() {
  return (
    <div>
      <Rating defaultValue={3} readonly />
    </div>
  );
}
