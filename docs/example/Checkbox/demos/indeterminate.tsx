/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/**
 * title: 实现全选效果
 */

import { Checkbox, Divider } from '@banana/banana-react';
import React, { useState } from 'react';

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
              apple: e.target.checked,
              banana: e.target.checked,
              cherry: e.target.checked,
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
              apple: e.target.checked,
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
              banana: e.target.checked,
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
              cherry: e.target.checked,
            });
          }}
        >
          Cherry🍒
        </Checkbox>
      </div>
    </>
  );
}
