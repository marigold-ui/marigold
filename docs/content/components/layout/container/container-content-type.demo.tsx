import { Container, Headline, Stack, Text } from '@marigold/components';

export default () => (
  <Stack space={2}>
    <Container contentType="header">
      <Headline level="5">The marigold flower</Headline>
    </Container>
    <Container>
      <Text>
        The marigold flower, known for its bright orange and yellow hues, is
        more than just a vibrant addition to gardens. Marigolds have been used
        for centuries in traditional medicine for their anti-inflammatory
        properties. In many cultures, they symbolize positive emotions like
        warmth and creativity, and are often used in festivals and celebrations.
        The marigold is also known for its ability to deter garden pests, making
        it a favorite companion plant for vegetables. Beyond their beauty, these
        flowers play a role in pollinator gardens, attracting bees and
        butterflies to enhance biodiversity.
      </Text>
    </Container>
  </Stack>
);
