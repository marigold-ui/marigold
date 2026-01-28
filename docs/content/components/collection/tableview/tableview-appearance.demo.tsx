import { DateFormat } from '@/ui';
import { I18nProvider, TableView } from '@marigold/components';
import type { TableViewProps } from '@marigold/components';

const columns = [
  { name: 'Id', key: 'id' },
  { name: 'Event', key: 'event' },
  { name: 'Date', key: 'date' },
];

const items: { [key: string]: string }[] = [
  { id: '1234', event: 'Concert', date: '2024-01-10' },
  { id: '82374', event: 'Open Air Festival', date: '2024-07-09' },
  { id: '724423', event: 'Live on Stage', date: '2024-11-25' },
  { id: '23497', event: 'Open Air Summertime', date: '2024-06-01' },
];

export default (props: TableViewProps) => (
  <TableView {...props}>
    <TableView.Header>
      <TableView.Column>Id</TableView.Column>
      <TableView.Column>Event</TableView.Column>
      <TableView.Column>Date</TableView.Column>
    </TableView.Header>
    <TableView.Body>
      {items.map(item => (
        <TableView.Row key={item.id}>
          <TableView.Cell>{item.id}</TableView.Cell>
          <TableView.Cell>{item.event}</TableView.Cell>
          <TableView.Cell>
            <I18nProvider locale="de-DE">
              <DateFormat dateStyle="full" value={new Date(`${item.date}`)} />
            </I18nProvider>
          </TableView.Cell>
        </TableView.Row>
      ))}
    </TableView.Body>
  </TableView>
);
