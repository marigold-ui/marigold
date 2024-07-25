import { Stack, TextField } from '@marigold/components';

export default () => (
  <Stack space={2}>
    <TextField label="E-Mail" type="email" />
    <TextField label="Date" type="date" />
    <TextField label="Phone number" type="tel" />
  </Stack>
);
