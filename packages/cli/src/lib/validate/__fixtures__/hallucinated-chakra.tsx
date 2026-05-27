import { Box, HStack, Heading, VStack } from '@marigold/components';

export default () => (
  <VStack spacing={4}>
    <Heading>Title</Heading>
    <HStack>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
    </HStack>
  </VStack>
);
