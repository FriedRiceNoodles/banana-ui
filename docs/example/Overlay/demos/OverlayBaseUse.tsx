/**
 * title: 基本使用
 */

import { Button, Overlay } from '@banana-ui/react';
import React, { useState } from 'react';

export default function OverlayBaseUse() {
  const [visiable, setVisiable] = useState(false);
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisiable(true);
        }}
      >
        展开遮罩层
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
