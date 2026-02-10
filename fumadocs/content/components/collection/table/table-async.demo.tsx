import { Table, useAsyncList } from '@marigold/components';

export interface asyncData {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
}

export default () => {
  let list = useAsyncList<asyncData>({
    initialSortDescriptor: { column: 'created', direction: 'ascending' },
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
          const first = a[sortDescriptor.column as keyof asyncData];
          const second = b[sortDescriptor.column as keyof asyncData];
          // Can be used for date sorting
          const firstDate =
            isNaN(first?.length) || first?.length > 4
              ? Date.parse(first)
              : null;
          const secondDate =
            isNaN(second?.length) || second?.length > 4
              ? Date.parse(second)
              : null;
          const isFirstValidDate =
            firstDate === null ? false : !isNaN(firstDate);
          const isSecondValidDate =
            secondDate === null ? false : !isNaN(secondDate);
          let cmp: number;

          if (isFirstValidDate && isSecondValidDate) {
            cmp = firstDate! < secondDate! ? -1 : 1;
          } else {
            cmp =
              (parseInt(first) || first) < (parseInt(second) || second)
                ? -1
                : 1;
          }
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
      stretch
    >
      <Table.Header>
        <Table.Column key="name" allowsSorting width="2/5">
          Name
        </Table.Column>
        <Table.Column key="height" allowsSorting>
          Height
        </Table.Column>
        <Table.Column key="mass" allowsSorting>
          Mass
        </Table.Column>
        <Table.Column key="birth_year" allowsSorting>
          Birth Year
        </Table.Column>
        <Table.Column key="created" allowsSorting>
          Created
        </Table.Column>
      </Table.Header>
      <Table.Body items={list.items}>
        {item => (
          <Table.Row key={(item as any).name}>
            {columnKey => (
              <Table.Cell>
                {columnKey === 'created'
                  ? `${new Date((item as any).created).toLocaleDateString()} ${new Date((item as any).created).toLocaleTimeString()}`
                  : (item as any)[columnKey]}
              </Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};
