import {
  Headline,
  Inline,
  Inset,
  Stack,
  TextField,
} from '@marigold/components';
import { VisualSpacing } from '@/ui/VisualSpacing';

export default () => (
  <Stack space="regular">
    <Headline level={2}>Shipping Address</Headline>
    <TextField label="Name" required />
    <VisualSpacing space="regular" orientation="vertical" />
    <TextField label="Street" required />
    <VisualSpacing space="regular" orientation="vertical" />
    <Inline space="related">
      <TextField label="Postal Code" width={20} />
      <VisualSpacing space="related" orientation="horizontal" />
      <TextField label="City" width={40} />
    </Inline>
    <VisualSpacing space="group" orientation="vertical" />
    <Inset spaceY="group">
      <Stack space="regular">
        <TextField label="Phone" />
        <VisualSpacing space="regular" orientation="vertical" />
        <TextField label="Email" type="email" />
      </Stack>
    </Inset>
  </Stack>
);
