'use client';

import { MoveRight } from 'lucide-react';
import { Button, Headline, Inline, Stack } from '@marigold/components';

export const CallToAction = () => (
  <Stack space={8}>
    <Headline level="1">Join Our Community Today!</Headline>
    <Inline space={4}>
      <Button variant="primary">Join Now</Button>
      <Button variant="ghost">
        Learn More <MoveRight />
      </Button>
    </Inline>
  </Stack>
);
