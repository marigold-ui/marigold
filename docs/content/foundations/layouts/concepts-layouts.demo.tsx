'use client';

import type { ReactNode } from 'react';
import { Columns, Stack, Text, Tiles } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

const Annotation = ({ children }: { children: ReactNode }) => (
  <Text fontSize="xs" align="center">
    {children}
  </Text>
);

export default () => (
  <Columns columns={[1, 1, 1]} space={6} collapseAt="0em">
    <>
      <Stack space={2}>
        <Rectangle height="2rem" />
        <Rectangle height="2rem" />
        <Rectangle height="2rem" />
      </Stack>
      <Annotation>Stack</Annotation>
    </>
    <>
      <Columns columns={[3, 1, 2]} space={2} collapseAt="0em">
        <Rectangle height="126px" />
        <Rectangle height="126px" />
        <Rectangle height="126px" />
      </Columns>
      <Annotation>Columns</Annotation>
    </>
    <>
      <Tiles space={2} tilesWidth="32px">
        <Rectangle height="30px" width="30px" />
        <Rectangle height="30px" width="30px" />
        <Rectangle height="30px" width="30px" />
        <Rectangle height="30px" width="30px" />
        <Rectangle height="30px" width="30px" />
        <Rectangle height="30px" width="30px" />
        <Rectangle height="30px" width="30px" />
        <Rectangle height="30px" width="30px" />
        <Rectangle height="30px" width="30px" />
      </Tiles>
      <Annotation>Tiles</Annotation>
    </>
  </Columns>
);
