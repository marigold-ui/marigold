import { Columns, Stack } from '@marigold/components';
import { Rectangle, Squirecle } from '~/components';

export const LayoutsDemo = () => (
  <Columns columns={[1, 1, 1]} space="medium-2" collapseAt="0em">
    <Stack space="small-1">
      <Rectangle />
      <Rectangle />
      <Rectangle />
    </Stack>
    <Columns columns={[3, 1, 2]} space="small-1" collapseAt="0em">
      <Rectangle height="100%" />
      <Rectangle height="100%" />
      <Rectangle height="100%" />
    </Columns>
    <Stack>
      <Squirecle />
      <Squirecle />
      <Squirecle />
    </Stack>
  </Columns>
);
