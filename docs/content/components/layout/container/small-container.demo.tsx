import { Container, Headline, Text } from '@marigold/components';

export default () => (
  <>
    <Container contentType="header" size="small" align="center">
      <Headline level={2}>Star Wars - The Empire Strikes Back</Headline>
    </Container>
    <Container size="small" align="center">
      <Text>
        It is a dark time for the Rebellion. Although the Death Star has been
        destroyed, Imperial troops have driven the Rebel forces from their
        hidden base and pursued them across the galaxy.
      </Text>
    </Container>
  </>
);
