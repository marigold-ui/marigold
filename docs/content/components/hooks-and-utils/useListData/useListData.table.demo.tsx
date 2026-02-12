import { Stack, Table, TextArea, useListData } from '@marigold/components';

export default () => {
  const columns = [
    { id: 'name', name: 'Name', key: 'name' },
    { id: 'firstname', name: 'Firstname', key: 'firstname' },
    { id: 'house', name: 'House', key: 'house' },
    { id: 'year', name: 'Year of birth', key: 'year' },
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
            <Table.Row columns={columns}>
              {column =>
                column.id !== 'house' ? (
                  <Table.Cell>{item[column.id]}</Table.Cell>
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
