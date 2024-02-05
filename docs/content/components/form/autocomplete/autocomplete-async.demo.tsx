import { Key, useState } from 'react';

import {
  Autocomplete,
  Message,
  Stack,
  Table,
  useAsyncList,
} from '@marigold/components';

export default () => {
  const columns = [
    { name: 'Name', id: 'name' },
    { name: 'Gender', id: 'gender' },
    { name: 'Skin Color', id: 'skin_color' },
    { name: 'height', id: 'height' },
    { name: 'Weight', id: 'mass' },
  ];

  const [result, setResult] = useState<{ [id: string]: string }[] | null>(null);
  const list = useAsyncList<{ [id: string]: string }>({
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
  const handleSubmit = (id: Key | null, value: string | null) => {
    if (id) {
      const result = list.items.find(c => c.name === id);
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
          <Autocomplete.Item id={item.name}>{item.name}</Autocomplete.Item>
        )}
      </Autocomplete>
      {result === null ? null : result.length > 0 ? (
        <Table aria-label="Character results" selectionMode="none" stretch>
          <Table.Header columns={columns}>
            {column => <Table.Column>{(column as any).name}</Table.Column>}
          </Table.Header>
          <Table.Body items={result}>
            {item => (
              <Table.Row key={(item as any).id}>
                {columnKey => <Table.Cell>{item[columnKey]}</Table.Cell>}
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      ) : (
        <Message messageTitle="Empty Result">
          No Character matched your query, sorry! 😭
        </Message>
      )}
    </Stack>
  );
};
