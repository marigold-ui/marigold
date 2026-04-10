'use client';

import { Card, Headline, Inset, Stack, Text } from '@marigold/components';

const AnalyticsPage = () => (
  <Inset space={4}>
    <Stack space={4}>
      <Headline level={2}>Analytics</Headline>
      <Text>View your analytics data and insights.</Text>
      {Array.from({ length: 8 }, (_, i) => (
        <Card key={i} p={4}>
          <Text size="sm">Analytics content section {i + 1}</Text>
        </Card>
      ))}
    </Stack>
  </Inset>
);

export default AnalyticsPage;
