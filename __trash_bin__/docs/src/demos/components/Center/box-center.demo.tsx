import { Box, Center, Inline, Text } from '@marigold/components';
import { Stop, Play, Pause } from '@marigold/icons';

export const BoxCenter = () => (
  <Inline space="xsmall">
    <Box
      as={Center}
      css={{
        border: '2px solid #ced4da',
        width: '80px',
        height: '40px',
      }}
    >
      <Text color="secondary">Song 1</Text>
    </Box>
    <Box
      as={Center}
      css={{
        bg: 'secondary',
        width: '40px',
        height: '40px',
      }}
    >
      <Play fill="white" />
    </Box>
    <Box
      as={Center}
      css={{
        bg: 'secondary',
        width: '40px',
        height: '40px',
      }}
    >
      <Pause fill="white" />
    </Box>
    <Box
      as={Center}
      css={{
        bg: 'secondary',
        width: '40px',
        height: '40px',
      }}
    >
      <Stop fill="white" />
    </Box>
  </Inline>
);
