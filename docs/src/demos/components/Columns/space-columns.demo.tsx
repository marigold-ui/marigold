import { Box, Columns } from '@marigold/components';

export const SpaceColumns = () => (
  <Columns space="xsmall" columns={[2, 8, 2]}>
    <Box border="1px solid #ced4da" bg="#e9ecef" height="100px" />
    <Box border="1px solid #ced4da" bg="#e9ecef" height="100px" />
    <Box border="1px solid #ced4da" bg="#e9ecef" height="100px" />
  </Columns>
);
