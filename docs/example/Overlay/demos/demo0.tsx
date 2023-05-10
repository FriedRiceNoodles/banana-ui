/**
 * title: 基本使用
 */

import { Overlay, Button } from '@banana/banana-react';
import React, { useState } from 'react';

export default function ButtonDemo0() {
  const [visiable, setVisiable] = useState(false);
  return (
    <div>
      <Button
        onClick={() => {
          setVisiable(true);
        }}
      >
        展开遮盖层
      </Button>
      <Overlay
        open={visiable}
        onClose={() => {
          setVisiable(false);
        }}
      ></Overlay>
    </div>
  );
}
