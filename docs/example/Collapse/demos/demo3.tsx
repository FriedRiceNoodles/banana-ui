/**
 * title: 手风琴模式
 * description: 通过监听折叠面板的<a href="#事件---events">展开事件</a>，来实现多个折叠面板的手风琴模式。<br /> 手风琴模式：指多个折叠面板同时存在时，最多只会有一个折叠面板被展开。
 */

import { Collapse } from '@banana-ui/react';
import React, { useState } from 'react';

export default function CollapseDemo3() {
  const [status, setStatus] = useState([false, false, false]);

  const handleShow = (index: number) => {
    const _status = [...status];
    for (let i = 0; i < _status.length; i++) {
      if (i === index) {
        _status[i] = true;
      } else {
        _status[i] = false;
      }
    }

    setStatus(_status);
  };

  return (
    <div>
      <Collapse title="折叠面板1" open={status[0]} onShow={() => handleShow(0)}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </Collapse>
      <Collapse title="折叠面板2" open={status[1]} onShow={() => handleShow(1)}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </Collapse>
      <Collapse title="折叠面板3" open={status[2]} onShow={() => handleShow(2)}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </Collapse>
    </div>
  );
}
