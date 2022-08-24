import { Container, Breakout, Box, Text } from '@marigold/components';

export const TextBreakout = () => (
  <Container alignContainer="center">
    <Box as={Text} pb="medium">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book.
    </Box>
    <Box as={Breakout} verticalAlign="left" css={{ fontWeight: 800 }}>
      IMPORTANT: This is a breakout text inside a container full of random text.
      Aligned from left to write and more width than the maximum width of the
      container.
    </Box>
    <Box as={Text} pt="medium">
      It has survived not only five centuries, but also the leap into electronic
      typesetting, remaining essentially unchanged. It was popularised in the
      1960s with the release of Letraset sheets containing Lorem Ipsum passages,
      and more recently with desktop publishing software like Aldus PageMaker
      including versions of Lorem Ipsum.
    </Box>
  </Container>
);
