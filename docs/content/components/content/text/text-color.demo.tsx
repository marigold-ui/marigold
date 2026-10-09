import { Stack, Text } from '@marigold/components';

export default () => (
  <Stack space="tight">
    <Text as="p">
      Cancelling{' '}
      <Text as="span" weight="semibold">
        Summer Open Air 2026
      </Text>{' '}
      refunds all 1,240 sold tickets.{' '}
      <Text as="span" weight="semibold" color="destructive-accent">
        This can't be undone.
      </Text>
    </Text>
    <Text as="p" size="sm" variant="muted">
      Ticket holders are notified by email within 24 hours.
    </Text>
  </Stack>
);
