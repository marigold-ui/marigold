'use client';

import { Aside } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <Aside space={5} side="right" sideWidth="100px">
    <Rectangle height="120px" />
    <Rectangle height="120px" />
  </Aside>
);
