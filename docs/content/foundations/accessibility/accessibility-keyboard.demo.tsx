import { DateFormat, NumericFormat } from '@/ui';
import { useState } from 'react';
import type { Selection } from '@marigold/components';
import {
  Badge,
  Button,
  Headline,
  Stack,
  Table,
  Text,
} from '@marigold/components';

interface Event {
  id: number;
  name: string;
  date: string;
  price: number;
  availableTickets: number;
  status: 'available' | 'limited' | 'soldout';
}

const items: Event[] = [
  {
    id: 1,
    name: 'The Laughing Llamas',
    date: '2024-10-12',
    price: 75,
    availableTickets: 122,
    status: 'available',
  },
  {
    id: 2,
    name: "Broadway's Biggest Burrito",
    date: '2024-10-15',
    price: 95,
    availableTickets: 53,
    status: 'limited',
  },
  {
    id: 3,
    name: 'Ultimate Pillow Fight Finals',
    date: '2024-11-02',
    price: 150,
    availableTickets: 0,
    status: 'soldout',
  },
  {
    id: 4,
    name: 'The Cheesy Joke Marathon',
    date: '2024-10-20',
    price: 40,
    availableTickets: 201,
    status: 'available',
  },
  {
    id: 5,
    name: 'Symphony of Snoring',
    date: '2024-11-05',
    price: 60,
    availableTickets: 89,
    status: 'available',
  },
  {
    id: 6,
    name: 'The Great Mustache Showcase',
    date: '2024-12-01',
    price: 25,
    availableTickets: 336,
    status: 'available',
  },
];

const STATUS = {
  available: 'success',
  limited: 'warning',
  soldout: 'error',
};

export default () => {
  const [selected, setSelected] = useState<Selection>(new Set());
  const count = selected === 'all' ? selected : selected.size;

  return (
    <Stack space={6} alignX="right">
      <Stack space={3} stretch>
        <header>
          <Headline id="table-header" level="5">
            Event List
          </Headline>
          <Text id="table-description" color="accent-700">
            Select events to generate statistics for analysis.
          </Text>
        </header>
        <Table
          aria-labelledby="table-header table-description"
          selectionMode="multiple"
          selectedKeys={selected}
          onSelectionChange={setSelected}
        >
          <Table.Header>
            <Table.Column rowHeader>Name</Table.Column>
            <Table.Column>Date</Table.Column>
            <Table.Column alignX="right">Price</Table.Column>
            <Table.Column alignX="right">Available Tickets</Table.Column>
            <Table.Column alignX="right">Status</Table.Column>
          </Table.Header>
          <Table.Body items={items}>
            {item => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>
                  <DateFormat
                    dateStyle="medium"
                    value={new Date(`${item.date}`)}
                  />
                </Table.Cell>
                <Table.Cell>
                  <NumericFormat
                    style="currency"
                    value={item.price}
                    currency="EUR"
                  />
                </Table.Cell>
                <Table.Cell>
                  <NumericFormat value={item.availableTickets} tabular />
                </Table.Cell>
                <Table.Cell>
                  <Badge variant={STATUS[item.status] as any}>
                    {item.status}
                  </Badge>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Stack>
      <Button variant="primary" disabled={count === 0}>
        Create statistics for {count} events
      </Button>
    </Stack>
  );
};
