'use client';

import { Card, Headline, Inset, Stack, Text } from '@marigold/components';

const GeneralPage = () => (
  <Inset space={4}>
    <Stack space={4}>
      <Headline level={2}>General</Headline>
      <Text>Manage your general settings and preferences.</Text>
      {Array.from({ length: 8 }, (_, i) => (
        <Card key={i} p={4}>
          <Text size="sm">General content section {i + 1}</Text>
        </Card>
      ))}
    </Stack>
  </Inset>
);

export default GeneralPage;
