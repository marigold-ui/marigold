import { Columns, Box } from '@marigold/components';

export const BasicColumns = () => (
  <Columns space="xsmall" columns={[2, 8, 2]} collapseAt="120px">
    <Box
      css={{
        border: '1px solid #ced4da',
        bg: '#e9ecef',
        height: '100px',
      }}
    />
    <Box
      css={{
        border: '1px solid #ced4da',
        bg: '#e9ecef',
        height: '100px',
      }}
    />
    <Box
      css={{
        border: '1px solid #ced4da',
        bg: '#e9ecef',
        height: '100px',
      }}
    />
  </Columns>
);
