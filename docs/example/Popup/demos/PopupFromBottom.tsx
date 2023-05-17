import { Button, Popup } from '@banana/banana-react';
import React, { useState } from 'react';

export default function PopupFromBottom() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);

  const content = (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <div>line 1</div>
      <div>line 2</div>
      <div>line 3</div>
      <div>line 4</div>
      <div>line 5</div>
      <div>line 6</div>
      <div>line 7</div>
      <div>line 8</div>
      <div>line 9</div>
      <div>line 10</div>
    </div>
  );

  return (
    <div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Button type="primary" onclick={() => setOpen1(true)}>
          从顶部弹出
        </Button>
        <Button type="primary" onclick={() => setOpen2(true)}>
          从右边弹出
        </Button>
        <Button type="primary" onclick={() => setOpen3(true)}>
          从底部弹出
        </Button>
        <Button type="primary" onclick={() => setOpen4(true)}>
          从左边弹出
        </Button>
      </div>

      <Popup open={open1} position="top" onClose={() => setOpen1(false)}>
        {content}
      </Popup>
      <Popup open={open2} position="right" onClose={() => setOpen2(false)}>
        {content}
      </Popup>
      <Popup open={open3} position="bottom" onClose={() => setOpen3(false)}>
        {content}
      </Popup>
      <Popup open={open4} position="left" onClose={() => setOpen4(false)}>
        {content}
      </Popup>
    </div>
  );
}
