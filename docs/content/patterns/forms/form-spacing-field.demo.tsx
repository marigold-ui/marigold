import { Headline, Stack, TextField } from '@marigold/components';
import { VisualSpacing } from '@/ui/VisualSpacing';

export default () => (
  <Stack space="regular">
    <Headline level={2}>Shipping Address</Headline>
    <TextField label="Name" required />
    <VisualSpacing space="regular" orientation="vertical" />
    <TextField label="Street" required />
    <VisualSpacing space="regular" orientation="vertical" />
    <Stack space="related">
      <TextField label="Postal Code" width={20} />
      <VisualSpacing space="related" orientation="vertical" />
      <TextField label="City" width={40} />
    </Stack>
    <VisualSpacing space="group" orientation="vertical" />
    <Stack space="group">
      <Stack space="regular">
        <TextField label="Phone" />
        <VisualSpacing space="regular" orientation="vertical" />
        <TextField label="Email" type="email" />
      </Stack>
    </Stack>
  </Stack>
);
