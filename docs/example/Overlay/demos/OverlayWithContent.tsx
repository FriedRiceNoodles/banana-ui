/**
 * title: 遮罩层带内容
 */

import { Button, Overlay } from '@banana-ui/react';
import React, { useState } from 'react';

export default function OverlayWithContent() {
  const [visiable, setVisiable] = useState(false);
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisiable(true);
        }}
      >
        展开遮罩层（带内容）
      </Button>
      <Overlay
        open={visiable}
        onClose={() => {
          setVisiable(false);
        }}
      >
        <div style={{ borderRadius: '4px', width: '200px', height: '200px', backgroundColor: 'white' }}></div>
      </Overlay>
    </div>
  );
}
