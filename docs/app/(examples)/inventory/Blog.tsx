'use client';

import { Headline, Stack, Text } from '@marigold/components';

export const Blog = () => (
  <Stack>
    <Stack space={4}>
      <Headline level="1">From the blog</Headline>
      <Text variant="muted">
        Learn how to grow your business with our expert advice.
      </Text>
    </Stack>
  </Stack>
);
