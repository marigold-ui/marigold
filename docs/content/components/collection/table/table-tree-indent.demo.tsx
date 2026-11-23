import { Table } from '@marigold/components';

interface TicketArea {
  id: string;
  name: string;
  sold: number;
  /** The ticket categories sold in this area. Only areas have them. */
  categories?: TicketArea[];
}

const areas: TicketArea[] = [
  {
    id: 'seated',
    name: 'Seated',
    sold: 412,
    categories: [
      { id: 'cat-a', name: 'Category A', sold: 180 },
      { id: 'cat-b', name: 'Category B', sold: 232 },
    ],
  },
  {
    id: 'standing',
    name: 'Standing',
    sold: 950,
    categories: [
      { id: 'front', name: 'Front of stage', sold: 300 },
      { id: 'general', name: 'General admission', sold: 650 },
    ],
  },
];

export default () => (
  <Table
    aria-label="Tickets sold per area and category"
    treeColumn="name"
    treeIndent="aligned"
    defaultExpandedKeys={['seated', 'standing']}
  >
    <Table.Header>
      <Table.Column id="name" rowHeader>
        Area
      </Table.Column>
      <Table.Column id="sold" alignX="right">
        Sold
      </Table.Column>
    </Table.Header>
    <Table.Body items={areas}>
      {function renderRow(row: TicketArea) {
        return (
          <Table.Row id={row.id}>
            <Table.Cell>{row.name}</Table.Cell>
            <Table.Cell alignX="right">{row.sold}</Table.Cell>
            <Table.ExpandableRows items={row.categories}>
              {renderRow}
            </Table.ExpandableRows>
          </Table.Row>
        );
      }}
    </Table.Body>
  </Table>
);
