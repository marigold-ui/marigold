import { Box, Button, Inline } from '@marigold/components';

export const ButtonBox = () => (
  <Inline space="medium">
    <Box
      as="button"
      css={{
        bg: 'primary',
        p: 8,
      }}
    >
      I am a button
    </Box>
    <Box as={Button} variant="primary">
      I am a button
    </Box>
  </Inline>
);
