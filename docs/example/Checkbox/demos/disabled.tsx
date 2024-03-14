/**
 * title: 禁用复选框
 * description: 禁用状态下无法进行交互，同时会有不同的样式，且**不会参与表单提交**。
 */

import { Checkbox } from '@banana-ui/react';

export default function Disabled() {
  return (
    <div>
      <Checkbox disabled>Checkbox</Checkbox>
      <br />
      <Checkbox defaultChecked disabled>
        Checkbox
      </Checkbox>
    </div>
  );
}
