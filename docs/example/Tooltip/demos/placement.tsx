/**
 * title: 弹出位置
 * desc: 通过 `placement` 属性设置弹出位置，默认为 `top`。
 */

import { Button, Tooltip } from '@banana-ui/react';
import React from 'react';

export default function Placement() {
  const styles = `
    .container {
      display: inline-flex;
      flex-direction: column;
      gap: 8px;
      --banana-tooltip-max-width: 80px;
    }

    .placement-row {
      display: flex;
      gap: 8px;
    }

    .placement-row b-button {
      width: 60px;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="container">
        <div className="placement-row">
          <Tooltip content="This is a tooltip." placement="topLeft">
            <Button style={{ marginLeft: '68px' }}>TL</Button>
          </Tooltip>
          <Tooltip content="This is a tooltip." placement="top">
            <Button>Top</Button>
          </Tooltip>
          <Tooltip content="This is a tooltip." placement="topRight">
            <Button style={{ marginRight: '68px' }}>TR</Button>
          </Tooltip>
        </div>
        <div className="placement-row" style={{ justifyContent: 'space-between' }}>
          <Tooltip content="This is a tooltip." placement="leftTop">
            <Button>LT</Button>
          </Tooltip>
          <Tooltip content="This is a tooltip." placement="rightTop">
            <Button>RT</Button>
          </Tooltip>
        </div>
        <div className="placement-row" style={{ justifyContent: 'space-between' }}>
          <Tooltip content="This is a tooltip." placement="left">
            <Button>Left</Button>
          </Tooltip>
          <Tooltip content="This is a tooltip." placement="right">
            <Button>Right</Button>
          </Tooltip>
        </div>
        <div className="placement-row" style={{ justifyContent: 'space-between' }}>
          <Tooltip content="This is a tooltip." placement="leftBottom">
            <Button>LB</Button>
          </Tooltip>
          <Tooltip content="This is a tooltip." placement="rightBottom">
            <Button>RB</Button>
          </Tooltip>
        </div>
        <div className="placement-row">
          <Tooltip content="This is a tooltip." placement="bottomLeft">
            <Button style={{ marginLeft: '68px' }}>BL</Button>
          </Tooltip>
          <Tooltip content="This is a tooltip." placement="bottom">
            <Button>Bottom</Button>
          </Tooltip>
          <Tooltip content="This is a tooltip." placement="bottomRight">
            <Button style={{ marginRight: '68px' }}>BR</Button>
          </Tooltip>
        </div>
      </div>
    </>
  );
}
