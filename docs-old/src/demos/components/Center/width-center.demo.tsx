import { Box, Center } from '@marigold/components';

export const WidthCenter = () => (
  <Center maxWidth="xxlarge">
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
