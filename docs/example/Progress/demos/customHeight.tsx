/**
 * title: 自定义高度
 */

import { Progress } from '@banana-ui/react';
import React from 'react';

export default function CustomHeight() {
  return (
    <div>
      <p>
        你可以使用 <code>height</code> 参数来自定义进度条的高度。
      </p>
      <Progress percent={50} height={16} />
      <p>
        也可以使用 <code>css变量</code> 来自定义进度条的高度。
      </p>
      <Progress percent={50} style={{ '--banana-progress-height': '16px' } as React.CSSProperties} />
      <p>
        默认情况下，进度条的 <code>border-radius </code> 是高度的一半，也就是说进度条是圆角的。
        一般来说，你很少需要改变这个值，但是如果你需要的话，你可以使用 <code>css变量</code> 来自定义进度条的{' '}
        <code>border-radius </code>。
      </p>
      <Progress percent={50} style={{ '--banana-progress-border-radius': '3px' } as React.CSSProperties} />
    </div>
  );
}
