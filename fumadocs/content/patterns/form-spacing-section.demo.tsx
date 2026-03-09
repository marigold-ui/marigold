import { Headline, Stack, TextField } from '@marigold/components';
import { VisualSpacing } from '@/ui/VisualSpacing';

export default () => (
  <Stack space="section">
    <Stack space="regular">
      <Headline level={2}>Personal Information</Headline>
      <TextField label="First Name" required />
      <TextField label="Last Name" required />
    </Stack>
    <VisualSpacing space="section" orientation="vertical" />
    <Stack space="regular">
      <Headline level={2}>Account Details</Headline>
      <TextField label="Username" required />
      <TextField label="Password" type="password" required />
    </Stack>
    <VisualSpacing space="section" orientation="vertical" />
    <Stack space="regular">
      <Headline level={2}>Preferences</Headline>
      <TextField label="Language" />
      <TextField label="Timezone" />
    </Stack>
  </Stack>
);
