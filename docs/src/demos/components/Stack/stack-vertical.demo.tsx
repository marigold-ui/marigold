import { Box, Stack, Text } from '@marigold/components';

export const VerticalStack = () => (
  <Box css={{ height: 200, bg: '#f1f3f5', p: 8 }}>
    <Stack space="medium" stretch alignY="bottom">
      <Text>Lirum</Text>
      <Text>Larum</Text>
      <Text>Löffelstiel!</Text>
    </Stack>
  </Box>
);
