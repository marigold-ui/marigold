import { Table, useAsyncList } from '@marigold/components';

export interface asyncData {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
}

export default () => {
  const columns = [
    { id: 'name', name: 'Name', allowsSorting: true },
    { id: 'height', name: 'Height', allowsSorting: true },
    { id: 'mass', name: 'Mass', allowsSorting: true },
    { id: 'birth_year', name: 'Birth Year', allowsSorting: true },
  ];

  let list = useAsyncList<asyncData>({
    async load({ signal }) {
      let res = await fetch(`https://swapi.py4e.com/api/people/?search`, {
        signal,
      });
      let json = await res.json();
      return {
        items: json.results,
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column as keyof asyncData];
          let second = b[sortDescriptor.column as keyof asyncData];
          let cmp =
            (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;
          if (sortDescriptor.direction === 'descending') {
            cmp *= -1;
          }
          return cmp;
        }),
      };
    },
  });

  return (
    <Table
      aria-label="Example table with client side sorting"
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
    >
      <Table.Header columns={columns}>
        {column => (
          <Table.Column key={column.id} allowsSorting={column.allowsSorting}>
            {column.name}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={list.items}>
        {item => (
          <Table.Row columns={columns}>
            {column => (
              <Table.Cell>{item[column.id as keyof asyncData]}</Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};
