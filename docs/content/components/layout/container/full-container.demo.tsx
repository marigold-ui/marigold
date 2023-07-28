import { Container, Headline, List, Text } from '@marigold/components';

export default () => (
  <Container size="large" alignItems="left" align="center">
    <Headline level="2">Star Wars - The Empire Strikes Back</Headline>
    <Text>
      It is a dark time for the Rebellion. Although the Death Star has been
      destroyed, Imperial troops have driven the Rebel forces from their hidden
      base and pursued them across the galaxy. Evading the dreaded Imperial
      Starfleet, a group of freedom fighters led by Luke Skywalker has
      established a new secret base on the remote ice world of Hoth. The evil
      lord Darth Vader, obsessed with finding young Skywalker, has dispatched
      thousands of remote probes into the far reaches of space....
    </Text>
    <List>
      <List.Item>Luke</List.Item>
      <List.Item>Leia</List.Item>
      <List.Item>Han Solo</List.Item>
      <List.Item>Chewbacca</List.Item>
      <List.Item>R2D2</List.Item>
      <List.Item>C3PO</List.Item>
      <List.Item>Darth Vader</List.Item>
    </List>
  </Container>
);
