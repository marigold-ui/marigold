import { Headline, Stack, TextField } from '@marigold/components';

export default () => {
  return (
    <Stack space={2}>
      <Headline level={'5'}>Disabled State</Headline>
      <TextField label="username" placeholder="enter user name" disabled />
    </Stack>
  );
};
