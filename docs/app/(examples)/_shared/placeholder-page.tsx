'use client';

import { Headline, Inset, Stack, Text } from '@marigold/components';

export const PlaceholderPage = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <Inset space={4}>
    <Stack space={2}>
      <Headline level={2}>{title}</Headline>
      <Text>{description}</Text>
    </Stack>
  </Inset>
);
