import { Inline, Stack, Text } from '@marigold/components';
import { DesignTicket } from '@marigold/icons';

export default () => (
  <Inline space={8} alignY="top">
    <Stack space={2} alignX="center">
      <DesignTicket size={32} />
      <Text size="sm">Default (currentColor)</Text>
    </Stack>
    <Stack space={2} alignX="center">
      <DesignTicket size={32} fill="var(--color-destructive-accent)" />
      <Text size="sm">fill colors the whole icon</Text>
    </Stack>
  </Inline>
);
