import { DateFormat } from '@/ui';
import { I18nProvider, Table } from '@marigold/components';
import type { TableProps } from '@marigold/components';

const items: { [key: string]: string }[] = [
  { id: '1234', event: 'Concert', date: '2024-01-10' },
  { id: '82374', event: 'Open Air Festival', date: '2024-07-09' },
  { id: '724423', event: 'Live on Stage', date: '2024-11-25' },
  { id: '23497', event: 'Open Air Summertime', date: '2024-06-01' },
];

export default (props: TableProps) => (
  <Table {...props}>
    <Table.Header>
      <Table.Column>Id</Table.Column>
      <Table.Column>Event</Table.Column>
      <Table.Column>Date</Table.Column>
    </Table.Header>
    <Table.Body>
      {items.map(item => (
        <Table.Row key={item.id}>
          <Table.Cell>{item.id}</Table.Cell>
          <Table.Cell>{item.event}</Table.Cell>
          <Table.Cell>
            <I18nProvider locale="de-DE">
              <DateFormat dateStyle="full" value={new Date(`${item.date}`)} />
            </I18nProvider>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);
