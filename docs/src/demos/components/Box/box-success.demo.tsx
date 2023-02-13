import { Box, Text } from '@marigold/components';

export const SuccessBox = () => (
  <Box
    css={{
      bg: 'success',
      p: 8,
      width: '25%',
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <Text color="white">Box Example</Text>
  </Box>
);
