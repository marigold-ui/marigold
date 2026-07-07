import { Card, Headline, Text, Tiles } from '@marigold/components';

export default () => (
  <div className="bg-background rounded-xl p-8">
    <Tiles space={4} tilesWidth="200px" stretch equalHeight>
      <Card stretch>
        <Card.Content>
          <Headline level={4}>Tickets sold</Headline>
          <Text>1.240</Text>
        </Card.Content>
      </Card>
      <Card stretch>
        <Card.Content>
          <Headline level={4}>Revenue</Headline>
          <Text>38.120 EUR</Text>
        </Card.Content>
      </Card>
      <Card stretch>
        <Card.Content>
          <Headline level={4}>Events</Headline>
          <Text>12 upcoming</Text>
        </Card.Content>
      </Card>
    </Tiles>
  </div>
);
