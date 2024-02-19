/**
 * title: 触发方式
 * description: 通过 `triggerAction` 参数设置触发方式，可选值为 `hover`、`click`， 默认为 `hover`。
 */

import { Button, Tooltip } from '@banana-ui/react';
import React from 'react';

export default function TriggerAction() {
  return (
    <div>
      <Tooltip content="This is a tooltip.">
        <Button>Hover</Button>
      </Tooltip>
      <Tooltip content="This is a tooltip." triggerAction="click">
        <Button style={{ marginLeft: '16px' }}>Click</Button>
      </Tooltip>
    </div>
  );
}
