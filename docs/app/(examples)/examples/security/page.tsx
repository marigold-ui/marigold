'use client';

import { Card, Headline, Inset, Stack, Text } from '@marigold/components';

const SecurityPage = () => (
  <Inset space={4}>
    <Stack space={4}>
      <Headline level={2}>Security</Headline>
      <Text>Manage your security settings and preferences.</Text>
      {Array.from({ length: 8 }, (_, i) => (
        <Card key={i} p={4}>
          <Text size="sm">Security content section {i + 1}</Text>
        </Card>
      ))}
    </Stack>
  </Inset>
);

export default SecurityPage;
