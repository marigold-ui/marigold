import type { ReactNode } from 'react';
import { Box, Columns, Stack, Text, Tiles } from '@marigold/components';
import { Rectangle, Squirecle } from '~/components';

const Annotation = ({ children }: { children: ReactNode }) => (
  <Text fontFamily="heading" align="center" m="none">
    {children}
  </Text>
);

export const LayoutsDemo = () => (
  <Box p="small-1" bg="background.light" borderRadius="medium-1">
    <Columns columns={[1, 1, 1]} space="medium-2" collapseAt="0em">
      <>
        <Stack space="small-1">
          <Rectangle />
          <Rectangle />
          <Rectangle />
        </Stack>
        <Annotation>Stack</Annotation>
      </>
      <>
        <Columns columns={[3, 1, 2]} space="small-1" collapseAt="0em">
          <Rectangle height="126px" />
          <Rectangle height="126px" />
          <Rectangle height="126px" />
        </Columns>
        <Annotation>Columns</Annotation>
      </>
      <>
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
      </>
    </Columns>
  </Box>
);
