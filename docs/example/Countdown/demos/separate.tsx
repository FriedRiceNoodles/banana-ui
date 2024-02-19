/**
 * title: 分离模式
 * description: 通过`separate`属性可以将倒计时的每个部分分离开来，这样可以更加灵活地自定义样式。并且可以通过`separator`插槽自定义分隔符。
 */

import { Countdown } from '@banana-ui/react';
import React from 'react';

export default function Separate() {
  // 2 小时
  const time = 1000 * 60 * 60 * 2;

  const style = `
    .countdown::part(separate-item) {
      color: #fff;
      background: red;
      padding: 0 8px;
      border-radius: 4px;
    }

    .countdown::part(separator) {
      margin: 0 4px;
      color: red;
    }
  `;

  return (
    <>
      <style>{style}</style>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Countdown className="countdown" format="HHmmssSSS" time={time} separate>
          <span className="separator" slot="separator">
            :
          </span>
        </Countdown>
      </div>
    </>
  );
}
