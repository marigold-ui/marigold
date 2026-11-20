import type { ReactNode } from 'react';
import { Stack, Text } from '@marigold/components';

// A labelled value on a detail page: a muted label above the value.
export const Field = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => (
  <Stack space="tight">
    <Text variant="muted" fontSize="xs">
      {label}
    </Text>
    <Text weight="semibold">{children}</Text>
  </Stack>
);
