import type { TextValueProps } from '@marigold/components';
import { Description, Stack, TextValue } from '@marigold/components';

export default (props: TextValueProps) => (
  <Stack space={1}>
    <TextValue {...props}>Pro plan</TextValue>
    <Description>Unlimited projects, priority support</Description>
  </Stack>
);
