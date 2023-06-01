import { Box } from '@marigold/components';

export const BasicFooter = () => (
  <>
    <Box
      css={{
        border: '1px solid #ced4da',
        bg: '#e9ecef',
        height: '300px',
        width: '100%',
      }}
    ></Box>
    <Box
      css={{
        border: '1px solid #ced4da',
        bg: '#e9ecef',
        height: '80px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      FOOTER
    </Box>
  </>
);
