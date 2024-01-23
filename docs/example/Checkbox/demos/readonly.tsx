/**
 * debug: true
 * title: 只读
 * description: 只读状态下无法进行交互，但**会参与表单提交**。
 */

import { Checkbox } from '@banana/banana-react';
import React from 'react';

export default function Readonly() {
  return (
    <div>
      <Checkbox readonly>Checkbox</Checkbox>
      <br />
      <Checkbox defaultChecked readonly>
        Checkbox
      </Checkbox>
    </div>
  );
}
