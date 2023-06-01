import { Box } from '@marigold/components';

export const BasicHeader = () => (
  <>
    <Box
      css={{
        border: '1px solid #ced4da',
        bg: '#e9ecef',
        height: '120px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      HEADER
    </Box>
    <Box
      css={{
        border: '1px solid #ced4da',
        bg: '#e9ecef',
        height: '300px',
        width: '100%',
      }}
    ></Box>
  </>
);
