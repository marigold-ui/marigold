import type { Key } from 'react';
import { useState } from 'react';
import { Stepper } from '@marigold/components';

export default () => {
  const [selectedKey, setSelectedKey] = useState<Key>('plan');
  const [completedKeys, setCompletedKeys] = useState<Key[]>(['signin']);

  const select = (key: Key) => {
    setCompletedKeys(keys =>
      keys.includes(selectedKey) ? keys : [...keys, selectedKey]
    );
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
