import { Box, Breakout } from '@marigold/components';

export const HorizontalBreakout = () => (
  <Breakout>
    <Box
      as={Breakout}
      border="1px solid #ced4da"
      bg="#e9ecef"
      height="100px"
      p="small"
      horizontalAlign="bottom"
      verticalAlign="center"
    >
      BREAKOUT with bottom aligned content
    </Box>
  </Breakout>
);
