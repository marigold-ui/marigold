'use client';

import { Stack, TextField } from '@marigold/components';

export default () => {
  return (
    <Stack space={2}>
      <TextField label="username" placeholder="enter user name" disabled />
    </Stack>
  );
};
