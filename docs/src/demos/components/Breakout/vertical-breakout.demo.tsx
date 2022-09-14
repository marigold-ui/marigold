import { Box, Breakout, Container } from '@marigold/components';

export const LeftAlignment = () => (
  <Container align="center">
    <Box
      css={{
        border: '1px solid #ced4da',
        bg: '#e9ecef',
        height: '80px',
        width: '100%',
      }}
    />
    <Breakout>
      <Box
        css={{
          bg: '#e9ecef',
          border: '1px solid #ced4da',
        }}
      >
        BREAKOUT with left alignment
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
