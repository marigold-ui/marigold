import {
  Button,
  Inline,
  Link,
  Select,
  Split,
  Stack,
  Table,
  Text,
  ThemeProvider,
} from '@marigold/components';
import React from 'react';

import coreTheme from '@marigold/theme-core';
import { ResaleLogbook, AutoRenew, ExternalLink } from '@marigold/icons';

const columns = [
  { name: 'Veranstaltung', key: 'event' },
  { name: 'Kategorie', key: 'category' },
  { name: 'Preisstufe', key: 'price' },
  { name: 'Platz', key: 'seat' },
  { name: 'Platzcode', key: 'code' },
  { name: 'Ticketcode', key: 'ticketcode' },
  { name: 'Gedruckt', key: 'print' },
  { name: 'Aktionen', key: 'actions' },
];

const rows: { [key: string]: string }[] = [
  {
    id: '0',
    event: '01.01.2022 20:00 Uhr - Test Veranstaltung',
    category: '',
    price: '',
    seat: '',
    code: '',
    ticketcode: 'Gruppenticket',
    print: '',
    actions: 'Gruppenticket drucken',
  },
  {
    id: '1',
    event: 'Test Veranstaltung 1',
    category: '1. Kategorie',
    price: 'Normalpreis',
    seat: 'Mitte - Reihe 12 - Platz 36',
    code: '1234',
    ticketcode: '1234567890',
    print: '1x',
    actions: 'Einzelticket drucken',
  },
  {
    id: '2',
    event: 'Test Veranstaltung 1',
    category: '1. Kategorie',
    price: 'Normalpreis',
    seat: 'Mitte - Reihe 12 - Platz 37',
    code: '4321',
    ticketcode: '1234567890',
    print: '1x',
    actions: 'Einzelticket drucken',
  },
];
export const CorePrintTable = () => {
  const [, setSelectedKeys] = React.useState(new Set());
  const [state, setState] = React.useState(true);
  const handleSelect = (key: string) => {
    if (key === 'ticketprint') {
      setState(false);
    } else {
      setState(true);
    }
    return state;
  };
  return (
    <ThemeProvider theme={coreTheme}>
      <Stack space="small">
        <Inline space="small">
          <Text variant="bold">Tickets</Text>
          <Split />
          <ResaleLogbook />
          <AutoRenew />
        </Inline>
        <Table
          aria-label="Example dynamic collection table"
          selectionMode="multiple"
          onSelectionChange={key => setSelectedKeys(new Set(key))}
        >
          <Table.Header columns={columns}>
            {column => <Table.Column>{column.name}</Table.Column>}
          </Table.Header>
          <Table.Body items={rows}>
            {rows.map(item => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.event}</Table.Cell>
                <Table.Cell>{item.category}</Table.Cell>
                <Table.Cell>{item.price}</Table.Cell>
                <Table.Cell>{item.seat}</Table.Cell>
                <Table.Cell>{item.code}</Table.Cell>
                <Table.Cell>
                  <Link href="https://www.reservix.de/" target="_blank">
                    <Inline space="0.5ch">
                      {item.ticketcode}
                      <ExternalLink size={14} />
                    </Inline>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link href="https://www.reservix.de/" target="_blank">
                    {item.print}
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link href="https://www.reservix.de/" target="_blank">
                    {item.actions}
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Inline space="xsmall">
          <Select
            label="Sammelaktion"
            placeholder="Bitte wählen"
            width="unset"
            onSelectionChange={handleSelect}
          >
            <Select.Option key="choose">Bitte wählen</Select.Option>
            <Select.Option key="ticketprint">Ticket drucken</Select.Option>
          </Select>
          <Button variant="secondary" disabled={state}>
            Ausführen
          </Button>
        </Inline>
      </Stack>
    </ThemeProvider>
  );
};
