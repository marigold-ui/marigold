import type { ReactNode } from 'react';
import { Card, Columns, Stack, Text, Tiles } from '@marigold/components';
import { Rectangle } from '@/app/components/Rectangle';
import { Squircle } from '@/app/components/Squircle';

const Annotation = ({ children }: { children: ReactNode }) => (
  <Text variant="caption" align="center">
    {children}
  </Text>
);

export default () => (
  <Card variant="paragraph" p={2}>
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
          <Squircle />
          <Squircle />
          <Squircle />
          <Squircle />
          <Squircle />
          <Squircle />
          <Squircle />
          <Squircle />
          <Squircle />
        </Tiles>
        <Annotation>Tiles</Annotation>
      </>
    </Columns>
  </Card>
);
