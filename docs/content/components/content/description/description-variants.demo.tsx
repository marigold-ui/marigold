import { Description, Stack } from '@marigold/components';

export default () => (
  <Stack space={3}>
    <Description variant="default">
      Default — Description text inherits the secondary content color so it
      pairs naturally with a Title or label.
    </Description>
    <Description variant="muted">
      Muted — Description text uses the tertiary color for the most subdued
      pairing.
    </Description>
  </Stack>
);
