import { useState } from 'react';
import { Button, Stack, Text } from '@marigold/components';

export default () => {
  const [pointerType, setPointerType] = useState('');

  return (
    <Stack space={2} alignX="left">
      <Button
        variant="secondary"
        onPressStart={e => setPointerType(e.pointerType)}
        onPressEnd={() => setPointerType('')}
      >
        Press me
      </Button>
      <Text>
        {pointerType
          ? `Button is pressed via ${pointerType}.`
          : 'Button not pressed.'}
      </Text>
    </Stack>
  );
};
