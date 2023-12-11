import { Table, useAsyncList } from '@marigold/components';

export interface asyncData {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
}

export default () => {
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
      <Table.Header>
        <Table.Column id="name" allowsSorting isRowHeader>
          Name
        </Table.Column>
        <Table.Column id="height" allowsSorting>
          Height
        </Table.Column>
        <Table.Column id="mass" allowsSorting>
          Mass
        </Table.Column>
        <Table.Column id="birth_year" allowsSorting>
          Birth Year
        </Table.Column>
      </Table.Header>
      <Table.Body items={list.items}>
        {item => (
          <Table.Row id={(item as any).name}>
            <Table.Cell>{(item as any).name}</Table.Cell>
            <Table.Cell>{(item as any).height}</Table.Cell>
            <Table.Cell>{(item as any).mass}</Table.Cell>
            <Table.Cell>{(item as any).birth_year}</Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};
