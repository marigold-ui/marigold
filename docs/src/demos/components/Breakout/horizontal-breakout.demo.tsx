import { Box, Breakout, Container } from '@marigold/components';

export const HorizontalBreakout = () => (
  <Container align="center">
    <Box
      css={{
        border: '1px solid #ced4da',
        bg: '#e9ecef',
        height: '80px',
        width: '100%',
      }}
    />
    <Breakout alignX="right">
      <Box>BREAKOUT with right aligned content</Box>
    </Breakout>
    <Box
      css={{
        border: '1px solid #ced4da',
        bg: '#e9ecef',
        height: '80px',
        width: '100%',
      }}
    />
  </Container>
);
