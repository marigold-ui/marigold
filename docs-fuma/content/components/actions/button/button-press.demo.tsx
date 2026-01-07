'use client';

import { useState } from 'react';
import { Button, Stack, Text } from '@marigold/components';

export default () => {
  const [pointerType, setPointerType] = useState('');
  const [count, setCount] = useState(0);

  return (
    <Stack space={3} alignX="left">
      <Button
        variant="primary"
        onPress={() => setCount(count + 1)}
        onPressStart={e => setPointerType(e.pointerType)}
        onPressEnd={() => setPointerType('')}
      >
        Press me
      </Button>
      <Text>
        Number of times pressed: {count} (
        {pointerType
          ? `Button is pressed via ${pointerType}.`
          : 'Button not pressed.'}
        )
      </Text>
    </Stack>
  );
};
