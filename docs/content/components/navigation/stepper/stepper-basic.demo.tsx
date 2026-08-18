import type { Key } from 'react';
import { useState } from 'react';
import { Stepper } from '@marigold/components';

const STEPS = ['signin', 'plan', 'pay', 'done'];

export default () => {
  const [selectedKey, setSelectedKey] = useState<Key>('plan');
  const completedKeys = STEPS.slice(0, STEPS.indexOf(selectedKey as string));

  return (
    <Stepper
      aria-label="Checkout progress"
      selectedKey={selectedKey}
      completedKeys={completedKeys}
      onSelectionChange={setSelectedKey}
    >
      <Stepper.Item id="signin">Sign in</Stepper.Item>
      <Stepper.Item id="plan">Choose plan</Stepper.Item>
      <Stepper.Item id="pay">Pay</Stepper.Item>
      <Stepper.Item id="done">Done</Stepper.Item>
    </Stepper>
  );
};
