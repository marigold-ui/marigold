import { Body, Card, Header, Headline, Text } from '@marigold/components';

export default () => (
  <Card>
    <Header>
      <Headline level={2}>A really good header!</Headline>
    </Header>
    <Body>
      <Text>In this body fits really great content.</Text>
    </Body>
    <footer>
      <Text>And awesome footer!</Text>
    </footer>
  </Card>
);
