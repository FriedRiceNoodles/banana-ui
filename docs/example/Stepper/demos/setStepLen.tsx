/**
 * title: 设置不同步长
 */
import { Button, Stepper } from '@banana/banana-react';
import React from 'react';

export default function setStepLen() {
  const [currentStep, setCurrentStep] = React.useState(1);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 5,
        }}
      >
        <Button onClick={() => setCurrentStep(currentStep + 1)}>增加步长</Button>
        <Button onClick={() => setCurrentStep(currentStep - 1)}>减少步长</Button>
      </div>
      <span>当前步长：{currentStep}</span>
      <Stepper step={currentStep} />
    </div>
  );
}
