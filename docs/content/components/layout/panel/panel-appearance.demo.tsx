import { venues } from '@/lib/data/venues';
import {
  Button,
  Description,
  Inline,
  Panel,
  PanelProps,
  Stack,
  Text,
  TextField,
  Title,
} from '@marigold/components';

const featured = [venues[5], venues[0], venues[6]];

export default ({ size, ...props }: PanelProps) => {
  if (size === 'form') {
    return (
      <Panel size={size} {...props}>
        <Panel.Header>
          <Title>Organizer profile</Title>
          <Description>
            Public details shown to customers on ticket confirmations and event
            pages.
          </Description>
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
        <Title>Featured venues</Title>
        <Description>
          A hand-picked selection of spaces across three countries, ready for
          your next booking.
        </Description>
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
                <Stack space="tight">
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
