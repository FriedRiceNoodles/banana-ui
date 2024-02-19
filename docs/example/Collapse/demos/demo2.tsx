/**
 * title: 自定义折叠/展开图标
 * description: 通过使用`slot`插槽实现自定义折叠/展开图标
 */

import { Collapse } from '@banana-ui/react';
import React from 'react';

export default function CollapseDemo2() {
  return (
    <div>
      <Collapse title="点我">
        <div style={{ display: 'flex' }} slot="expand-icon">
          <svg
            t="1683252527212"
            className="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="993"
            width="16"
            height="16"
          >
            <path
              d="M863.328262 481.340895l-317.344013 0.099772L545.984249 162.816826c0-17.664722-14.336138-32.00086-32.00086-32.00086s-31.99914 14.336138-31.99914 32.00086l0 318.400215-322.368714-0.17718c-0.032684 0-0.063647 0-0.096331 0-17.632039 0-31.935493 14.239806-32.00086 31.904529-0.096331 17.664722 14.208843 32.031824 31.871845 32.095471l322.59234 0.17718 0 319.167424c0 17.695686 14.336138 32.00086 31.99914 32.00086s32.00086-14.303454 32.00086-32.00086L545.982529 545.440667l317.087703-0.099772c0.063647 0 0.096331 0 0.127295 0 17.632039 0 31.935493-14.239806 32.00086-31.904529S880.960301 481.404542 863.328262 481.340895z"
              fill="#575B66"
              p-id="994"
            ></path>
          </svg>
        </div>
        <div style={{ display: 'flex' }} slot="collapse-icon">
          <svg
            t="1683252725530"
            className="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1193"
            width="16"
            height="16"
          >
            <path
              d="M863.74455 544.00086 163.424056 544.00086c-17.664722 0-32.00086-14.336138-32.00086-32.00086s14.336138-32.00086 32.00086-32.00086l700.320495 0c17.695686 0 31.99914 14.336138 31.99914 32.00086S881.440237 544.00086 863.74455 544.00086z"
              fill="#575B66"
              p-id="1194"
            ></path>
          </svg>
        </div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </Collapse>
    </div>
  );
}
