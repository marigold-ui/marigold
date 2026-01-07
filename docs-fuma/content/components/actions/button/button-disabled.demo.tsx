'use client';

import { Button, Stack, Text } from '@marigold/components';

export default () => (
  <Stack space={1} alignX="left">
    <Button disabled>Add discount code</Button>
    <Text color="text-base-disabled" fontSize="xs">
      Only Fanclub members can add a discount code. If you're a Fanclub member,
      please log in first.
    </Text>
  </Stack>
);
