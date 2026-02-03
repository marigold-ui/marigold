# useListData

_Manages state for an immutable list data structure, and provides convenience methods to update the data over time._

We use the `useListData` hook from [`react-spectrum stately package`](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/data/src/useListData.ts).

The hook helps manage an immutable list data structure, with helper methods to update the data in an efficient way. Since the data is stored in React state, calling these methods to update the data automatically causes the component to re-render accordingly.

More information can be found in the [react-spectrum documentation](https://react-spectrum.adobe.com/react-stately/useListData.html).

## Usage

## Import

To import the hook you just have to use this code below.

```tsx
import { useListData } from '@marigold/components';
```

## Examples

### Table with input field

This example show how to update data inside a table.

```tsx title="useListData.table"
import { Stack, Table, TextArea, useListData } from '@marigold/components';

export default () => {
  const columns = [
    { name: 'Name', key: 'name' },
    { name: 'Firstname', key: 'firstname' },
    { name: 'House', key: 'house' },
    { name: 'Year of birth', key: 'year' },
  ];

  const rowData: { [key: string]: string }[] = [
    {
      id: '1',
      name: 'Potter',
      firstname: 'Harry',
      house: 'Gryffindor',
      year: '1980',
    },
    {
      id: '2',
      name: 'Malfoy',
      firstname: 'Draco',
      house: 'Slytherin',
      year: '1980',
    },
    {
      id: '3',
      name: 'Diggory',
      firstname: 'Cedric',
      house: 'Hufflepuff',
      year: '1977',
    },
    {
      id: '4',
      name: 'Lovegood',
      firstname: 'Luna',
      house: 'Ravenclaw',
      year: '1981',
    },
  ];

  const list = useListData({
    initialItems: rowData,
    getKey: item => item.id,
  });

  function handleChange(itemId: string, newValue: string, key: string): void {
    const [changedItem] = list.items
      .filter(item => item.id === itemId)
      .map(item => {
        return { ...item, [key]: newValue };
      });

    list.update(itemId, changedItem);
  }

  return (
    <Stack space={3}>
      <Table aria-label="Example dynamic collection table">
        <Table.Header columns={columns}>
          {column => <Table.Column>{column.name}</Table.Column>}
        </Table.Header>
        <Table.Body items={list.items}>
          {item => (
            <Table.Row key={item.id}>
              {columnKey =>
                columnKey !== 'house' ? (
                  <Table.Cell>{item[columnKey]}</Table.Cell>
                ) : (
                  <Table.Cell>
                    <TextArea
                      value={item.house}
                      disabled={false}
                      onChange={value => handleChange(item.id, value, 'house')}
                      rows={3}
                      aria-label={'house'}
                    />
                  </Table.Cell>
                )
              }
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </Stack>
  );
};
```
