import { Inline, Headline, Text } from '@marigold/components';

export const InlineNested = () => (
  <Inline space="large">
    <Inline space="xsmall">
      <Headline level="2">Block #1</Headline>
      <Text>Lorem ipsum dolor sit amet.</Text>
    </Inline>
    <Inline space="xsmall">
      <Headline level="2">Bock #2</Headline>
      <Text>Lorem ipsum dolor sit amet.</Text>
    </Inline>
  </Inline>
);
