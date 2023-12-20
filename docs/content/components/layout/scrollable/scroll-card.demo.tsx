import { Card, Headline, List, Scrollable } from '@marigold/components';

export default () => (
  <Card p={3}>
    <Scrollable height="200px">
      <Headline level={3}>Burger Menu</Headline>
      <List>
        <List.Item>
          Crispy Chicken Burger
          <List>
            <List.Item>Hähnchen Filet im Crunchy Cornflakes Mantel</List.Item>
          </List>
        </List.Item>
        <List.Item>
          Cream Cheese Chicken Burger
          <List>
            <List.Item>Hähnchen Filet im Crunchy Cornflakes Mantel</List.Item>
            <List.Item>Rucola</List.Item>
            <List.Item>Frischkäse</List.Item>
          </List>
        </List.Item>
        <List.Item>
          Farmer
          <List>
            <List.Item>Rindfleisch</List.Item>
            <List.Item>Bacon</List.Item>
            <List.Item>Spiegelei</List.Item>
          </List>
        </List.Item>
      </List>
    </Scrollable>
  </Card>
);
