import {
  Button,
  Headline,
  Inline,
  Select,
  Split,
  Stack,
  Table,
  Text,
  ThemeProvider,
} from '@marigold/components';
import React from 'react';

import coreTheme from '@marigold/theme-core';
import { ResaleLogbook, AutoRenew, ExternalLink, Lock } from '@marigold/icons';

const columns = [
  { name: 'Veranstaltung', key: 'event' },
  { name: 'Platz', key: 'seat' },
  { name: 'Platzcode', key: 'code' },
  { name: 'Ticketcode', key: 'ticketcode' },
  { name: 'Gedruckt', key: 'print' },
  { name: 'Aktueller Tickettyp', key: 'type' },
  { name: 'Aktionen', key: 'actions' },
];

const rows: { [key: string]: any }[] = [
  {
    id: '0-header',
    event: '01.01.2022, 20:00 Uhr - Test Veranstaltung',
    seat: '',
    code: '',
    ticketcode: '',
    print: '',
    type: '',
    actions: 'Gruppenticket drucken',
  },
  {
    id: '1',
    event: 'Test Veranstaltung 1',
    seat: 'Mitte - Reihe 12 - Platz 36',
    code: '1234',
    ticketcode: '1234567890',
    print: '1x',
    type: 'print@home',
    actions: 'Einzelticket drucken',
  },
  {
    id: '2',
    event: 'Test Veranstaltung 1',
    seat: 'Mitte - Reihe 12 - Platz 37',
    code: '4321',
    ticketcode: '1234567890',
    print: '1x',
    type: 'print@home',
    actions: 'Einzelticket drucken',
  },
  {
    id: '1-header',
    event: '07.01.2022, 20:00 Uhr - Test Veranstaltung',
    seat: '',
    code: '',
    ticketcode: '',
    print: '',
    type: '',
    actions: 'Gruppenticket drucken',
  },
  {
    id: '3',
    event: 'Test Veranstaltung 2',
    seat: 'Mitte - Reihe 10 - Platz 7',
    code: '4321',
    ticketcode: '1234567890',
    print: '1x',
    type: 'print@home',
    actions: 'Einzelticket drucken',
    locked: true,
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
      <Stack space="xsmall">
        <Inline space="small">
          <Headline level="4">Veranstaltungen</Headline>
          <Split />
          <Stack alignX="center">
            <ResaleLogbook />
            <Text>Logbuch</Text>
          </Stack>
          <Stack alignX="center">
            <AutoRenew />
            <Text>Refresh</Text>
          </Stack>
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
              <Table.Row
                key={item.id}
                variant={item.id.includes('header') ? 'rowSection' : undefined}
              >
                <Table.Cell>
                  {item.id.includes('header') ? (
                    <strong>{item.event}</strong>
                  ) : (
                    <>
                      {item.locked === true ? (
                        <Inline>
                          <Lock size={14} />
                          {item.event}
                        </Inline>
                      ) : (
                        <Text>{item.event}</Text>
                      )}
                    </>
                  )}
                </Table.Cell>
                <Table.Cell>{item.seat}</Table.Cell>
                <Table.Cell>{item.code}</Table.Cell>
                <Table.Cell>
                  {item.ticketcode && (
                    <>
                      {item.locked === true ? (
                        <Inline>
                          <Button variant="link">
                            <Lock size={14} />
                            {item.ticketcode}
                            <ExternalLink size={14} />
                          </Button>
                        </Inline>
                      ) : (
                        <Button variant="link">
                          {item.ticketcode}
                          <ExternalLink size={14} />
                        </Button>
                      )}
                    </>
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Button variant="link">{item.print}</Button>
                </Table.Cell>
                <Table.Cell>
                  <Button variant="link">{item.type}</Button>
                </Table.Cell>
                <Table.Cell>
                  <Button variant="link">
                    {item.locked === true
                      ? 'Ticketsperre bearbeiten'
                      : 'Einzelticket drucken'}
                  </Button>
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
            onChange={handleSelect}
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
