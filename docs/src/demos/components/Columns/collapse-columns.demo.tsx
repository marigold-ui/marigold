import { Box, Columns } from '@marigold/components';

export const CollapseColumns = () => (
  <Columns collapseAt="50em" space="xsmall" columns={[2, 10]}>
    <Box border="1px solid #ced4da" bg="#e9ecef" height="100px" />
    <Box border="1px solid #ced4da" bg="#e9ecef" height="100px" />
  </Columns>
);
