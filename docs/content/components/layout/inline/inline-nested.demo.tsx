import { Headline, Inline, Text } from '@marigold/components';

export default () => (
  <Inline space={7}>
    <Inline space={1}>
      <Headline level="2">Block #1</Headline>
      <Text>Lorem ipsum dolor sit amet.</Text>
    </Inline>
    <Inline space={1}>
      <Headline level="2">Bock #2</Headline>
      <Text>Lorem ipsum dolor sit amet.</Text>
    </Inline>
  </Inline>
);
