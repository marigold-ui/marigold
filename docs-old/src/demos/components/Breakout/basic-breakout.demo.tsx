import { Container, Breakout, Box } from '@marigold/components';

export const BasicBreakout = () => (
  <Container align="center">
    <Box
      css={{
        border: '1px solid #ced4da',
        bg: '#e9ecef',
        height: '80px',
        width: '100%',
      }}
    />
    <Breakout alignY="center">
      <Box
        css={{
          bg: '#e9ecef',
          border: '1px solid #ced4da',
          textAlign: 'center',
        }}
      >
        BREAKOUT
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
