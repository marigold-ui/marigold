import { Box, Stack, Split, Text } from '@marigold/components';

export const SplitWithStack = () => (
  <Box css={{ height: 200 }}>
    <Stack space="xxsmall" stretch>
      <Text>It's gonna be ...</Text>
      <Text>wait for it!</Text>
      <Split />
      <Text>... legendary!</Text>
    </Stack>
  </Box>
);
