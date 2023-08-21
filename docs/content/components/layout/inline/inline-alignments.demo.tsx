import { Headline, Inline, Text } from '@marigold/components';

export default () => (
  <>
    <Inline space={3} alignY="top">
      <Headline level="2">Top</Headline>
      <Text>Lorem ipsum dolor sit amet.</Text>
    </Inline>
    <Inline space={3}>
      <Headline level="2">Center</Headline>
      <Text>Lorem ipsum dolor sit amet.</Text>
    </Inline>
    <Inline space={3} alignY="bottom">
      <Headline level="2">Bottom</Headline>
      <Text>Lorem ipsum dolor sit amet.</Text>
    </Inline>
  </>
);
