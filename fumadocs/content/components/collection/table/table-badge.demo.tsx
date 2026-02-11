import { DateFormat } from '@/ui';
import { Badge, I18nProvider, Table } from '@marigold/components';

export default () => {
  const columns = [
    { name: 'Id', key: 'id' },
    { name: 'Event', key: 'event' },
    { name: 'Date', key: 'date' },
    { name: 'Status', key: 'status' },
  ];
  const rowData: { [key: string]: string }[] = [
    {
      id: '16382462873',
      event: 'Concert',
      date: '2024-01-10',
      status: 'updated',
    },
    {
      id: '383262736',
      event: 'Open Air Festival',
      date: '2024-07-09',
      status: 'new',
    },
    {
      id: '62836432',
      event: 'Live on Stage',
      date: '2024-11-25',
      status: '',
    },
    {
      id: '82742834',
      event: 'Open Air Summertime',
      date: '2024-06-01',
      status: 'updated',
    },
    {
      id: '78263482',
      event: 'Opera',
      date: '2024-12-12',
      status: 'new',
    },
    {
      id: '9823742',
      event: 'Musical',
      date: '2024-08-19',
      status: 'updated',
    },
  ];
  return (
    <Table size="compact">
      <Table.Header columns={columns}>
        {column => (
          <Table.Column rowHeader={column.key === 'id'}>
            {column.name}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={rowData}>
        {item => (
          <Table.Row key={item.id}>
            <Table.Cell>{item.id}</Table.Cell>
            <Table.Cell>{item.event}</Table.Cell>
            <Table.Cell>
              <I18nProvider locale="de-DE">
                <DateFormat dateStyle="full" value={new Date(`${item.date}`)} />
              </I18nProvider>
            </Table.Cell>
            <Table.Cell>
              {item.status !== '' ? <Badge>{item.status}</Badge> : '-'}
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};
