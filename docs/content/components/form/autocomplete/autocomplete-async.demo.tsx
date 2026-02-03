import { Key, useState } from 'react';
import {
  Autocomplete,
  SectionMessage,
  Stack,
  Table,
  useAsyncList,
} from '@marigold/components';

export default () => {
  const columns = [
    { id: 1, name: 'Name', key: 'name' },
    { id: 2, name: 'Gender', key: 'gender' },
    { id: 3, name: 'Skin Color', key: 'skin_color' },
    { id: 4, name: 'height', key: 'height' },
    { id: 5, name: 'Weight', key: 'mass' },
  ];

  const [result, setResult] = useState<{ [key: string]: string }[] | null>(
    null
  );
  const list = useAsyncList<{ [key: string]: string }>({
    async load({ signal, filterText }) {
      const res = await fetch(
        `https://swapi.py4e.com/api/people/?search=${filterText}`,
        {
          signal,
        }
      );
      const json = await res.json();

      return {
        items: json.results,
      };
    },
  });
  const handleSubmit = (key: Key | null, value: string | null) => {
    if (key) {
      const result = list.items.find(c => c.name === key);
      setResult(result ? [result] : null);
    }
    if (value) {
      setResult(list.items);
    }
  };

  return (
    <Stack space={5}>
      <Autocomplete
        label="Star Wars Character"
        menuTrigger="focus"
        items={list.items}
        value={list.filterText}
        onChange={list.setFilterText}
        onSubmit={handleSubmit}
      >
        {(item: any) => (
          <Autocomplete.Option id={item.name}>{item.name}</Autocomplete.Option>
        )}
      </Autocomplete>
      {result === null ? null : result.length > 0 ? (
        <Table aria-label="Character results" selectionMode="none" stretch>
          <Table.Header columns={columns}>
            {column => <Table.Column>{(column as any).name}</Table.Column>}
          </Table.Header>
          <Table.Body items={result}>
            {item => (
              <Table.Row columns={columns}>
                {column => <Table.Cell>{item[column.id]}</Table.Cell>}
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      ) : (
        <SectionMessage>
          <SectionMessage.Title>Empty Result</SectionMessage.Title>
          <SectionMessage.Content>
            No Character matched your query, sorry! 😭
          </SectionMessage.Content>
        </SectionMessage>
      )}
    </Stack>
  );
};
