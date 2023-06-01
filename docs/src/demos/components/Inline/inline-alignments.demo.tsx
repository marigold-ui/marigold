import { Inline, Headline, Text } from '@marigold/components';

export const InlineAlignments = () => (
  <>
    <Inline space="medium" alignY="top">
      <Headline level="2">Top</Headline>
      <Text>Lorem ipsum dolor sit amet.</Text>
    </Inline>
    <Inline space="medium">
      <Headline level="2">Center</Headline>
      <Text>Lorem ipsum dolor sit amet.</Text>
    </Inline>
    <Inline space="medium" alignY="bottom">
      <Headline level="2">Bottom</Headline>
      <Text>Lorem ipsum dolor sit amet.</Text>
    </Inline>
  </>
);
