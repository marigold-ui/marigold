import type { ReactNode } from 'react';
import { Box, Columns, Stack, Text, Tiles } from '@marigold/components';
import { Rectangle, Squirecle } from '~/components';

const Annotation = ({ children }: { children: ReactNode }) => (
  <Text align="center" m="none">
    {children}
  </Text>
);

export const LayoutsDemo = () => (
  <Box>
    <Columns columns={[1, 1, 1]} space="medium-2" collapseAt="0em">
      <div>
        <Stack space="small-1">
          <Rectangle />
          <Rectangle />
          <Rectangle />
        </Stack>
        <Annotation>Stack</Annotation>
      </div>
      <div>
        <Columns columns={[3, 1, 2]} space="small-1" collapseAt="0em">
          <Rectangle height="126px" />
          <Rectangle height="126px" />
          <Rectangle height="126px" />
        </Columns>
        <Annotation>Columns</Annotation>
      </div>
      <div>
        <Tiles space="small-1" itemMinWidth="32px">
          <Squirecle />
          <Squirecle />
          <Squirecle />
          <Squirecle />
          <Squirecle />
          <Squirecle />
          <Squirecle />
          <Squirecle />
          <Squirecle />
        </Tiles>
        <Annotation>Tiles</Annotation>
      </div>
    </Columns>
  </Box>
);
