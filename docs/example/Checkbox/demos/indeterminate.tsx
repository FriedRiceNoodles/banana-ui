/**
 * title: 实现全选效果
 * description: 如果你需要实现全选效果，`indeterminate` 属性应该可以帮到你。该属性唯一的作用是改变 Checkbox 的样式，不会影响 Checkbox 的选中(`checked`)状态。
 */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Checkbox, Divider } from '@banana-ui/react';
import { useState } from 'react';

export default function Indeterminate() {
  const [options, setOptions] = useState({
    apple: false,
    banana: false,
    cherry: false,
  });

  const isAllChecked = Object.values(options).every(Boolean);

  return (
    <>
      <div>
        <Checkbox
          indeterminate={!isAllChecked && Object.values(options).some(Boolean)}
          onChange={(e) => {
            setOptions({
              apple: e.detail.checked,
              banana: e.detail.checked,
              cherry: e.detail.checked,
            });
          }}
          checked={isAllChecked}
        >
          Check All
        </Checkbox>
      </div>
      <Divider />
      <div
        style={{
          display: 'flex',
          gap: '20px',
        }}
      >
        <Checkbox
          checked={options.apple}
          onChange={(e) => {
            setOptions({
              ...options,
              apple: e.detail.checked,
            });
          }}
        >
          Apple🍎
        </Checkbox>

        <Checkbox
          checked={options.banana}
          onChange={(e) => {
            setOptions({
              ...options,
              banana: e.detail.checked,
            });
          }}
        >
          Banana🍌
        </Checkbox>

        <Checkbox
          checked={options.cherry}
          onChange={(e) => {
            setOptions({
              ...options,
              cherry: e.detail.checked,
            });
          }}
        >
          Cherry🍒
        </Checkbox>
      </div>
    </>
  );
}
