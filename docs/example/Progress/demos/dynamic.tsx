/**
 * title: 你可以试着让这个进度条动起来
 */

import { Button, Progress } from '@banana-ui/react';
import React from 'react';

export default function Dynamic() {
  const [percent, setPercent] = React.useState(0);

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Progress percent={percent} />
      <Button onClick={() => setPercent((percent) => percent + 10)} type="primary" size="small">
        +10%
      </Button>
      <Button onClick={() => setPercent(0)} type="warning" size="small">
        Reset
      </Button>
    </div>
  );
}
