import { Box, Breakout, Container } from '@marigold/components';

export const VerticalAlignment = () => (
  <Container align="center">
    <Box
      css={{
        border: '1px solid #ced4da',
        bg: '#e9ecef',
        height: '80px',
        width: '100%',
      }}
    />
    <Breakout height="100px" alignY="bottom">
      <Box
        css={{
          bg: '#e9ecef',
          border: '1px solid #ced4da',
        }}
      >
        BREAKOUT with bottom alignment
      </Box>
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
