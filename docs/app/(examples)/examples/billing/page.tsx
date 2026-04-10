'use client';

import { Card, Headline, Inset, Stack, Text } from '@marigold/components';

const BillingPage = () => (
  <Inset space={4}>
    <Stack space={4}>
      <Headline level={2}>Billing</Headline>
      <Text>Manage your billing settings and preferences.</Text>
      {Array.from({ length: 8 }, (_, i) => (
        <Card key={i} p={4}>
          <Text size="sm">Billing content section {i + 1}</Text>
        </Card>
      ))}
    </Stack>
  </Inset>
);

export default BillingPage;
