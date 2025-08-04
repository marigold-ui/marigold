import { Body, Card, Footer, Headline, Text } from '@marigold/components';

export default () => (
  <Card>
    <header>
      <Headline level={2}>A really good header!</Headline>
    </header>
    <Body>
      <Text>In this body fits really great content.</Text>
    </Body>
    <Footer>
      <Text>And awesome footer!</Text>
    </Footer>
  </Card>
);
