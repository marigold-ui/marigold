import { Box } from '@marigold/components';

export const TextBox = () => (
  <Box
    as="p"
    border="1px solid"
    borderRadius="5px"
    p="8px"
    css={{ bg: 'lightseagreen', color: 'white' }}
  >
    I am a paragraph with a lot of props!
  </Box>
);
