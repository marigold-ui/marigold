import { Aspect, Box, Breakout, Container, Text } from '@marigold/components';

export const iframeBreakout = () => (
  <Container align="center">
    <Box
      as={Text}
      css={{
        pb: 'medium',
      }}
    >
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book.
    </Box>
    <Breakout>
      <Aspect ratio="ultrawide">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4820.000043444012!2d7.826018541821473!3d48.020383262446884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47911b1e29425703%3A0xbe342117a976e59!2sEuropa-Park%20Stadion!5e1!3m2!1sde!2sde!4v1647595604899!5m2!1sde!2sde"
          title="sc_map"
          width="100%"
          height="100%"
        />
      </Aspect>
    </Breakout>
    <Box as={Text} css={{ pt: 'medium' }}>
      It has survived not only five centuries, but also the leap into electronic
      typesetting, remaining essentially unchanged. It was popularised in the
      1960s with the release of Letraset sheets containing Lorem Ipsum passages,
      and more recently with desktop publishing software like Aldus PageMaker
      including versions of Lorem Ipsum.
    </Box>
  </Container>
);
