import { venueTypes, venues } from '@/lib/data/venues';
import {
  ActionMenu,
  NumericFormat,
  Scrollable,
  Table,
} from '@marigold/components';

export default () => (
  <Scrollable>
    <Table aria-label="Venues" selectionMode="multiple">
      <Table.Header>
        <Table.Column rowHeader sticky="start" width={240}>
          Venue
        </Table.Column>
        <Table.Column width={220}>Type</Table.Column>
        <Table.Column width={220}>Street</Table.Column>
        <Table.Column width={160}>City</Table.Column>
        <Table.Column width={160}>Country</Table.Column>
        <Table.Column alignX="right" width={120}>
          Capacity
        </Table.Column>
        <Table.Column alignX="right" width={200}>
          Price
        </Table.Column>
        <Table.Column alignX="right" width={100}>
          Rating
        </Table.Column>
        <Table.Column sticky="end" width={72}>
          Actions
        </Table.Column>
      </Table.Header>
      <Table.Body>
        {venues.map(venue => (
          <Table.Row key={venue.id}>
            <Table.Cell>{venue.name}</Table.Cell>
            <Table.Cell>{venueTypes[venue.type]}</Table.Cell>
            <Table.Cell>{venue.street}</Table.Cell>
            <Table.Cell>{venue.city}</Table.Cell>
            <Table.Cell>{venue.country}</Table.Cell>
            <Table.Cell>
              <NumericFormat value={venue.capacity} />
            </Table.Cell>
            <Table.Cell>
              <NumericFormat
                style="currency"
                currency="EUR"
                value={venue.price.from}
              />
              {' – '}
              <NumericFormat
                style="currency"
                currency="EUR"
                value={venue.price.to}
              />
            </Table.Cell>
            <Table.Cell>{venue.rating}</Table.Cell>
            <Table.Cell>
              <ActionMenu
                variant="ghost"
                size="icon"
                aria-label={`Actions for ${venue.name}`}
              >
                <ActionMenu.Item id="edit">Edit</ActionMenu.Item>
                <ActionMenu.Item id="archive">Archive</ActionMenu.Item>
              </ActionMenu>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </Scrollable>
);
