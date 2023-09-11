/**
 * title: 禁用评分
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
