import type { Key } from 'react';
import { useState } from 'react';
import { Stepper } from '@marigold/components';

export default () => {
  const [selectedKey, setSelectedKey] = useState<Key>('plan');
  // Completion only ever grows. Deriving it from the current step would undo it
  // the moment the user walks back, and every later step would stop being
  // clickable, so there would be no way forward again.
  const [completedKeys, setCompletedKeys] = useState<Key[]>(['signin']);

  const select = (key: Key) => {
    setCompletedKeys(keys => (keys.includes(key) ? keys : [...keys, key]));
    setSelectedKey(key);
  };

  return (
    <Stepper
      aria-label="Checkout progress"
      selectedKey={selectedKey}
      completedKeys={completedKeys}
      onSelectionChange={select}
    >
      <Stepper.Item id="signin">Sign in</Stepper.Item>
      <Stepper.Item id="plan">Choose plan</Stepper.Item>
      <Stepper.Item id="pay">Pay</Stepper.Item>
      <Stepper.Item id="done">Done</Stepper.Item>
    </Stepper>
  );
};
