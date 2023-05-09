/**
 * title: 遮盖层带内容
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
        展开遮盖层（带内容）
      </Button>
      <Overlay
        open={visiable}
        onMaskClose={() => {
          setVisiable(false);
        }}
      >
        <div style={{ borderRadius: '4px', width: '200px', height: '200px', backgroundColor: 'white' }}></div>
      </Overlay>
    </div>
  );
}
