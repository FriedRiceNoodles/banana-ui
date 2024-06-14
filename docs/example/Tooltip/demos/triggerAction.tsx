/**
 * title: 触发方式
 * description: 通过 `triggerAction` 参数设置触发方式，可选值为 `hover`、`click`、`none`， 默认为 `hover`。
 */

import { Button, Tooltip } from '@banana-ui/react';

export default function TriggerAction() {
  return (
    <div>
      <Tooltip content="This is a tooltip.">
        <Button>Hover</Button>
      </Tooltip>
      <Tooltip content="This is a tooltip." triggerAction="click">
        <Button style={{ marginLeft: '16px' }}>Click</Button>
      </Tooltip>
      <Tooltip content="Set triggerAction to 'none' will make the tooltip always show." triggerAction="none">
        <Button style={{ marginLeft: '16px' }}>None</Button>
      </Tooltip>
    </div>
  );
}
