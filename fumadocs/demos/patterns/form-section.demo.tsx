import { Headline, Stack, TextField } from '@marigold/components';

export default () => (
  <Stack space="section">
    <Stack space="fieldY">
      <Headline level={2}>Personal Information</Headline>
      <TextField label="First Name" required />
      <TextField label="Last Name" required />
      <TextField label="Email" required />
    </Stack>
    <Stack space="fieldY">
      <Headline level={2}>Account Details</Headline>
      <TextField label="Username" required />
      <TextField label="Password" type="password" required />
      <TextField label="Confirm Password" type="password" required />
    </Stack>
    <Stack space="fieldY">
      <Headline level={2}>Profile Settings</Headline>
      <TextField label="Bio" />
      <TextField label="Website" type="url" />
      <TextField label="Location" />
    </Stack>
  </Stack>
);
