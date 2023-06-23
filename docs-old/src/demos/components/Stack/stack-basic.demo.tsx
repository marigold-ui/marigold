import { Box, Headline, Stack, Text } from '@marigold/components';

export const BasicStack = () => (
  <Box
    css={{
      border: '1px solid #ced4da',
      bg: '#e9ecef',
      p: 'small',
    }}
  >
    <Stack space="small">
      <Headline level="2">Header</Headline>
      <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
      <Text>
        Phasellus ipsum tortor, aliquet dapibus fermentum in, mollis vel metus.
      </Text>
    </Stack>
  </Box>
);
