# useAsyncListData

_Hook that returns async data_

We use the `useAsyncListData` hook from [`react-spectrum stately package`](https://github.com/adobe/react-spectrum/tree/main/packages/%40react-stately). It extends the `useListData` which is also from `react-spectrum`.

It supports async loading, pagination, sorting and filtering.
It also manages loading and error states, supports abortable requests and works with any data fetchig library or the built-in browser fetch API.

More information can be found in the [react-spectrum documentation](https://react-spectrum.adobe.com/react-stately/useAsyncList.html).

## Import

```tsx
import { useAsyncListData } from '@marigold/components';
```

## Examples

### Async Table

This is an example from the [`<Table>`](/components/table/) component. The data will be loaded asynchronously.

```tsx title="async"
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
        <Table.Column key="name" allowsSorting>
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
      </Table.Header>
      <Table.Body items={list.items}>
        {item => (
          <Table.Row key={(item as any).name}>
            {columnKey => <Table.Cell>{(item as any)[columnKey]}</Table.Cell>}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};
```
