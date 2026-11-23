import { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Inline,
  Skeleton,
  Stack,
  Text,
  Title,
  VisuallyHidden,
} from '@marigold/components';

// Mirrors EventCard: title, two lines of text, a badge. Same layout, same gaps,
// and text lines as tall as the card's line height, so the card doesn't resize.
const EventCardSkeleton = () => (
  <Card aria-hidden="true" stretch>
    <Card.Header>
      <Skeleton width="1/2" height={5} />
    </Card.Header>
    <Card.Content>
      <Stack space="related">
        <Skeleton height={5} />
        <Skeleton width="2/3" height={5} />
        <Skeleton width={16} height={4} variant="rounded" />
      </Stack>
    </Card.Content>
  </Card>
);

const EventCard = () => (
  <Card stretch>
    <Card.Header>
      <Title>Summer Open Air</Title>
    </Card.Header>
    <Card.Content>
      <Stack space="related">
        <Text>Stadtpark, Bielefeld</Text>
        <Text>Saturday, 18 July, 19:00</Text>
        <Inline>
          <Badge variant="success">On sale</Badge>
        </Inline>
      </Stack>
    </Card.Content>
  </Card>
);

export default () => {
  const [loading, setLoading] = useState(true);

  // Simulates a request. In an app, `loading` comes from your data hook, and the
  // skeleton waits about a second before it shows. The demo skips that delay.
  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <Stack space="regular" alignX="left">
      {/* `loading`, not `disabled`, so the button keeps keyboard focus. */}
      <Button onPress={() => setLoading(true)} loading={loading}>
        Reload
      </Button>
      {/* Stays mounted, only its text changes, so screen readers announce it. */}
      <VisuallyHidden role="status">
        {loading ? 'Loading event…' : 'Event loaded'}
      </VisuallyHidden>
      <div className="w-80">
        {loading ? <EventCardSkeleton /> : <EventCard />}
      </div>
    </Stack>
  );
};
