'use client';

import { Center, Inline, Stack } from '@marigold/components';
import { Divider } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <Center>
    <Stack space={8}>
      <Inline space={3} alignY="top">
        <Rectangle height="40px" width="40px" />
        <Rectangle height="60px" width="60px">
          <div className="text-text-primary-muted m-auto">Top</div>
        </Rectangle>
        <Rectangle height="40px" width="40px" />
      </Inline>
      <Divider />
      <Inline space={3} alignY="center">
        <Rectangle height="40px" width="40px" />
        <Rectangle height="60px" width="60px">
          <div className="text-text-primary-muted m-auto">Center</div>
        </Rectangle>
        <Rectangle height="40px" width="40px" />
      </Inline>
      <Divider />
      <Inline space={3} alignY="bottom">
        <Rectangle height="40px" width="40px" />
        <Rectangle height="60px" width="60px">
          <div className="text-text-primary-muted m-auto">Bottom</div>
        </Rectangle>
        <Rectangle height="40px" width="40px" />
      </Inline>
    </Stack>
  </Center>
);
