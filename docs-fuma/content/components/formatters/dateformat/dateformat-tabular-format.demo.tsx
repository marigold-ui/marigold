import { useState } from 'react';
import {
  DateFormat,
  NumericFormat,
  Stack,
  Switch,
  Table,
} from '@marigold/components';

const events = [
  { name: 'Conference', price: 199, date: new Date(2025, 2, 10) },
  { name: 'Workshop', price: 49, date: new Date(2025, 5, 22) },
  { name: 'Webinar', price: 0, date: new Date(2025, 8, 5) },
  { name: 'Meetup', price: 10, date: new Date(2025, 10, 18) },
];

export default () => {
  const [tabular, setTabular] = useState(true);

  return (
    <Stack space={4}>
      <Switch
        label="Use tabular digits"
        selected={tabular}
        onChange={setTabular}
      />

      <Table>
        <Table.Header>
          <Table.Column>Event</Table.Column>
          <Table.Column>Price</Table.Column>
          <Table.Column>Date</Table.Column>
        </Table.Header>
        <Table.Body>
          {events.map(event => (
            <Table.Row key={event.name}>
              <Table.Cell>{event.name}</Table.Cell>
              <Table.Cell>
                <NumericFormat
                  value={event.price}
                  style="currency"
                  currency="EUR"
                />
              </Table.Cell>
              <Table.Cell>
                <DateFormat
                  value={event.date}
                  dateStyle="medium"
                  tabular={tabular}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Stack>
  );
};
