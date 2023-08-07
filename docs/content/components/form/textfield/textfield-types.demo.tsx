import { Stack, TextField } from '@marigold/components';

export default () => (
  <Stack space={2}>
    <TextField label="EMail" type="email" />
    <TextField label="Date" type="date" />
    <TextField label="Phone Number" type="tel" />
  </Stack>
);
