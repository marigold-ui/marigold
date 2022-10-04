import { Stack, TextField } from '@marigold/components';

export const TypesTextField = () => (
  <Stack space="small">
    <TextField label="EMail" type="email" />
    <TextField label="Date" type="date" />
    <TextField label="Phone Number" type="tel" />
  </Stack>
);
