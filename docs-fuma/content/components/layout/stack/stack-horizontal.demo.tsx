'use client';

import { Divider, Stack } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <Stack space={4}>
    <Stack space={4} alignX="left">
      <Rectangle height="30px" width="50px">
        <div className="text-text-primary-muted m-auto">Left</div>
      </Rectangle>
      <Rectangle height="30px" width="50px" />
      <Rectangle height="30px" width="50px" />
    </Stack>
    <Divider />
    <Stack space={4} alignX="center">
      <Rectangle height="30px" width="50px">
        <div className="text-text-primary-muted m-auto">Center</div>
      </Rectangle>
      <Rectangle height="30px" width="50px" />
      <Rectangle height="30px" width="50px" />
    </Stack>
    <Divider />
    <Stack space={4} alignX="right">
      <Rectangle height="30px" width="50px">
        <div className="text-text-primary-muted m-auto">Right</div>
      </Rectangle>
      <Rectangle height="30px" width="50px" />
      <Rectangle height="30px" width="50px" />
    </Stack>
  </Stack>
);
