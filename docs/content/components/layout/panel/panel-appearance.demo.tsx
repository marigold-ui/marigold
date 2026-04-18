import { venues } from '@/lib/data/venues';
import {
  Button,
  Inline,
  Panel,
  PanelProps,
  Stack,
  Text,
  TextField,
} from '@marigold/components';

const featured = [venues[5], venues[0], venues[6]];

export default ({ size, ...props }: PanelProps) => {
  if (size === 'form') {
    return (
      <Panel size={size} {...props}>
        <Panel.Header>
          <Panel.Title>Organizer profile</Panel.Title>
          <Panel.Description>
            Public details shown to customers on ticket confirmations and event
            pages.
          </Panel.Description>
        </Panel.Header>
        <Panel.Content>
          <Stack space="regular">
            <TextField label="Organizer name" defaultValue="Marigold Events" />
            <TextField
              label="Support email"
              defaultValue="hello@marigold-events.com"
            />
          </Stack>
        </Panel.Content>
      </Panel>
    );
  }

  return (
    <Panel size={size} {...props}>
      <Panel.Header>
        <Panel.Title>Featured venues</Panel.Title>
        <Panel.Description>
          A hand-picked selection of spaces across three countries, ready for
          your next booking.
        </Panel.Description>
      </Panel.Header>
      <Panel.Content>
        <Stack space="regular">
          {featured.map(venue => (
            <Inline
              key={venue.id}
              alignY="center"
              alignX="between"
              space="group"
            >
              <Inline alignY="center" space="related">
                <img
                  src={venue.image}
                  alt=""
                  className="size-10 shrink-0 rounded-md object-cover"
                />
                <Stack space="0.5">
                  <Text weight="medium">{venue.name}</Text>
                  <Text size="xs" color="secondary">
                    {venue.city}, {venue.country} · {venue.capacity} guests
                  </Text>
                </Stack>
              </Inline>
              <Button variant="ghost">View details</Button>
            </Inline>
          ))}
        </Stack>
      </Panel.Content>
    </Panel>
  );
};
