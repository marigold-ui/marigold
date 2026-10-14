import { venues } from '@/lib/data/venues';
import { Link, NumericFormat, Stack, Table, Text } from '@marigold/components';

// Reserved `.example` domains, so the demo never links to a real site.
const website = (name: string) =>
  `${name.toLowerCase().replace(/[^a-z0-9]+/g, '')}.example`;

export default () => (
  <Table aria-label="Venues with their websites">
    <Table.Header>
      <Table.Column rowHeader minWidth={240}>
        Venue
      </Table.Column>
      <Table.Column minWidth={160}>City</Table.Column>
      <Table.Column alignX="right" width={100}>
        Capacity
      </Table.Column>
      <Table.Column alignX="right" width={80}>
        Rating
      </Table.Column>
    </Table.Header>
    <Table.Body>
      {venues.slice(0, 4).map(venue => (
        <Table.Row key={venue.id}>
          <Table.Cell textValue={venue.name}>
            <Stack space="0.5">
              <Text weight="medium">{venue.name}</Text>
              <Link
                href={`https://${website(venue.name)}`}
                target="_blank"
                size="small"
              >
                {website(venue.name)}
              </Link>
            </Stack>
          </Table.Cell>
          <Table.Cell>
            {venue.city}, {venue.country}
          </Table.Cell>
          <Table.Cell>
            <NumericFormat value={venue.capacity} />
          </Table.Cell>
          <Table.Cell>{venue.rating}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);
