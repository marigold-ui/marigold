'use client';

import { useState } from 'react';
import { Container, Headline, Select, Stack, Text } from '@marigold/components';

type FontSizes = 'sm' | 'base' | 'lg';

export default () => {
  const [fontSize, setFontSize] = useState<FontSizes>('base');

  return (
    <Stack space={8}>
      <Select
        label="Font size"
        selectedKey={fontSize}
        onChange={(val: FontSizes) => setFontSize(val)}
        width={52}
      >
        <Select.Option id="sm">Small</Select.Option>
        <Select.Option id="base">Default</Select.Option>
        <Select.Option id="lg">Large</Select.Option>
      </Select>

      <Container space={4}>
        <Headline level="3">The Marigold</Headline>
        <Text fontSize={fontSize}>
          Golden petals catch the sun,Blooming bright till day is done.In the
          garden, standing bold,A gentle spark, the marigold.
        </Text>
        <Text fontSize={fontSize}>
          Dew drops fall and sparkle clear,Nature's beauty, always near.Orange
          flames in sunlight hold,Cheerful blooms, the marigold.
        </Text>
      </Container>
    </Stack>
  );
};
