import { Key, useState } from 'react';
import {
  Autocomplete,
  SectionMessage,
  Stack,
  Table,
  useAsyncList,
} from '@marigold/components';

interface Character {
  name: string;
  gender: string;
  skin_color: string;
  height: string;
  mass: string;
  [key: string]: string;
}

interface Column {
  name: string;
  key: string;
}

export default () => {
  const columns: Column[] = [
    { name: 'Name', key: 'name' },
    { name: 'Gender', key: 'gender' },
    { name: 'Skin Color', key: 'skin_color' },
    { name: 'height', key: 'height' },
    { name: 'Weight', key: 'mass' },
  ];

  const [result, setResult] = useState<Character[] | null>(null);
  const list = useAsyncList<Character>({
    async load({ signal, filterText }) {
      const res = await fetch(
        `https://swapi.py4e.com/api/people/?search=${filterText}`,
        { signal }
      );
      const json = await res.json();

      return {
        items: json.results,
      };
    },
  });
  const handleSubmit = (value: string | number | null, key: Key | null) => {
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
        {obj => {
          const item = obj as unknown as Character;
          return (
            <Autocomplete.Option id={item.name}>
              {item.name}
            </Autocomplete.Option>
          );
        }}
      </Autocomplete>
      {result === null ? null : result.length > 0 ? (
        <Table aria-label="Character results" selectionMode="none" stretch>
          <Table.Header columns={columns}>
            {column => <Table.Column>{(column as Column).name}</Table.Column>}
          </Table.Header>
          <Table.Body items={result}>
            {item => (
              <Table.Row key={item.name}>
                {columnKey => (
                  <Table.Cell>{item[columnKey as keyof Character]}</Table.Cell>
                )}
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
