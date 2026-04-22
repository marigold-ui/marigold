'use client';

import { Card, Headline, Inset, Stack, Text } from '@marigold/components';

export const PlaceholderPage = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <Inset space={4}>
    <Stack space={4}>
      <Headline level={2}>{title}</Headline>
      <Text>{description}</Text>
      {Array.from({ length: 8 }, (_, i) => (
        <Card key={i}>
          <Text size="sm">
            {title} content section {i + 1}
          </Text>
        </Card>
      ))}
    </Stack>
  </Inset>
);
