import { Body, Card, Headline, Text } from '@marigold/components';

export default () => (
  <Card>
    <header>
      <Headline level={2}>A really good header!</Headline>
    </header>
    <Body>
      <Text>In this body fits really great content.</Text>
    </Body>
    <footer>
      <Text>And awesome footer!</Text>
    </footer>
  </Card>
);
