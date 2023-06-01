import { Box, Center } from '@marigold/components';

export const BasicCenter = () => (
  <Center maxWidth="min(350px, 50vw)">
    <Box
      css={{
        border: '1px solid #ced4da',
        bg: '#e9ecef',
        height: '100px',
        width: '100%',
      }}
    />
  </Center>
);
