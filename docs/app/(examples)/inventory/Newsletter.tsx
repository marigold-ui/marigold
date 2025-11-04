'use client';

import { Columns, Headline, Text } from '@marigold/components';

export const Newsletter = () => (
  <Columns columns={[2, 1, 1]} space={4}>
    <div>
      <Headline level={2}>Subscribe to our Newsletter</Headline>
      <Text variant="muted" fontSize="lg">
        Get the latest updates and offers.
      </Text>
    </div>
    <div></div>
    <div></div>
  </Columns>
);
