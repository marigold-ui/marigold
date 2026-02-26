import { Stack, Table, TextArea, useListData } from '@marigold/components';

export default () => {
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
        <Table.Header>
          <Table.Column rowHeader>Name</Table.Column>
          <Table.Column>Firstname</Table.Column>
          <Table.Column>House</Table.Column>
          <Table.Column>Year of birth</Table.Column>
        </Table.Header>
        <Table.Body items={list.items}>
          {item => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.firstname}</Table.Cell>
              <Table.Cell>
                <TextArea
                  value={item.house}
                  disabled={false}
                  onChange={value => handleChange(item.id, value, 'house')}
                  rows={3}
                  aria-label={'house'}
                />
              </Table.Cell>
              <Table.Cell>{item.year}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </Stack>
  );
};
