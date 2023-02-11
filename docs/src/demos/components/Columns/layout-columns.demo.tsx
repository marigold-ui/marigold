import { Box, Columns } from '@marigold/components';

export const PageLayoutColumns = () => (
  <Columns space="xsmall" columns={[2, 8, 2]} collapseAt="25em">
    <Box
      css={{
        border: '1px solid #ced4da',
        bg: '#e9ecef',
        height: '250px',
        p: 'xsmall',
      }}
    >
      Left Sidebar
    </Box>
    <Box
      css={{
        border: '1px solid #ced4da',
        bg: '#e9ecef',
        height: '250px',
        p: 'xsmall',
      }}
    >
      Main Content
    </Box>
    <Box
      css={{
        border: '1px solid #ced4da',
        bg: '#e9ecef',
        height: '250px',
        p: 'xsmall',
      }}
    >
      Right Sidebar
    </Box>
  </Columns>
);
