import { Card, Inline, Stack, Text } from '@marigold/components';

const now = Date.now();
const earliestEventDate = new Date(now).toLocaleDateString();
const latestEventDate = new Date(now + 3600 * 1000 * 24).toLocaleDateString();

const EventDateCard = () => (
  <Card>
    <Card.Body>
      <Stack>
        <Inline>
          <Text>Earliest event date:</Text>
          <Text weight="bold">{earliestEventDate}</Text>
        </Inline>
        <Inline>
          <Text>Latest event date:</Text>
          <Text weight="bold">{latestEventDate}</Text>
        </Inline>
        <Inline>
          <Text>Total events:</Text>
          <Text weight="bold">10</Text>
        </Inline>
      </Stack>
    </Card.Body>
  </Card>
);

export default () => (
  <>
    <div className="bg-bg-surface-sunken shadow-surface-sunken rounded-xl p-4">
      <p>sunken layer 👍</p>
      <EventDateCard />
    </div>
    <div className="bg-bg-surface shadow-surface rounded-xl p-4">
      <p>default layer 👍</p>
      <EventDateCard />
    </div>
    <div className="bg-bg-surface-raised shadow-surface-raised rounded-xl p-4">
      <p>Same layer like card 👎</p>
      <EventDateCard />
    </div>
  </>
);
