/**
 * title: 自定义间距
 */

import { Divider } from '@banana-ui/react';
import React from 'react';

export default function customSpacing() {
  const style = `
      .surrounding {
        text-align: center;
        color: gray;
        font-size: 12px;
      }
    `;

  return (
    <>
      <style>{style}</style>
      <p>
        你可以使用<code>spacing</code>参数自定义分割线的间距：
      </p>
      <div className="surrounding">上面的元素</div>
      <Divider spacing={8} />
      <div className="surrounding">下面的元素</div>
      <br />

      <div className="surrounding">上面的元素</div>
      <Divider spacing="8px" />
      <div className="surrounding">下面的元素</div>
      <br />

      <div className="surrounding">上面的元素</div>
      <Divider spacing="0.5rem" />
      <div className="surrounding">下面的元素</div>
      <br />

      <p>也可以通过css变量的方式自定义分割线的粗细：</p>
      <div className="surrounding">上面的元素</div>
      <Divider style={{ '--banana-divider-spacing': '8px' } as React.CSSProperties} />
      <div className="surrounding">下面的元素</div>
    </>
  );
}
