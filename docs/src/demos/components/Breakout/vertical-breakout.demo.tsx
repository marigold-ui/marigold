import { Box, Breakout } from '@marigold/components';

export const LeftAlignment = () => (
  <Breakout>
    <Box
      as={Breakout}
      border="1px solid #ced4da"
      bg="#e9ecef"
      height="100px"
      p="small"
    >
      BREAKOUT with left aligned content
    </Box>
  </Breakout>
);
