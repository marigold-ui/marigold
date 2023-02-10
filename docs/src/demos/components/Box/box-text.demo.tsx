import { Box } from '@marigold/components';

export const TextBox = () => (
  <Box
    as="p"
    css={{
      border: '1px solid',
      borderRadius: 5,
      p: 8,
      bg: 'lightseagreen',
      color: 'white',
    }}
  >
    I am a paragraph with a lot of props!
  </Box>
);
