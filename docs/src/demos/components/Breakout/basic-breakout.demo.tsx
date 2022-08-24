import { Container, Breakout, Box } from '@marigold/components';

export const BasicBreakout = () => (
  <Container alignContainer="center">
    <Box border="1px solid #ced4da" bg="#e9ecef" height="80px" width="100%" />
    <Breakout>
      <Box
        as={Breakout}
        verticalAlign="center"
        horizontalAlign="center"
        border="1px solid #ced4da"
        bg="#e9ecef"
        height="80px"
      >
        BREAKOUT
      </Box>
    </Breakout>
    <Box border="1px solid #ced4da" bg="#e9ecef" height="80px" width="100%" />
  </Container>
);
