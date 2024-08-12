import React from 'react';
import { Divider, Inline, Stack } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <Stack space={8}>
    <Inline space={3} alignX="left">
      <Rectangle height="60px" width="60px" />
      <Rectangle height="60px" width="60px">
        <div className="text-text-primary-muted m-auto">Left</div>
      </Rectangle>
      <Rectangle height="60px" width="60px" />
    </Inline>
    <Divider />
    <Inline space={3} alignX="center">
      <Rectangle height="60px" width="60px" />
      <Rectangle height="60px" width="60px">
        <div className="text-text-primary-muted m-auto">Center</div>
      </Rectangle>
      <Rectangle height="60px" width="60px" />
    </Inline>
    <Divider />
    <Inline space={3} alignX="right">
      <Rectangle height="60px" width="60px" />
      <Rectangle height="60px" width="60px">
        <div className="text-text-primary-muted m-auto">Right</div>
      </Rectangle>
      <Rectangle height="60px" width="60px" />
    </Inline>
  </Stack>
);
