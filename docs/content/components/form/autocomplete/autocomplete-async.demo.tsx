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
    { name: 'Name', key: 'name' },
    { name: 'Gender', key: 'gender' },
    { name: 'Skin Color', key: 'skin_color' },
    { name: 'height', key: 'height' },
    { name: 'Weight', key: 'mass' },
  ];

  const [result, setResult] = useState<{ [key: string]: string }[] | null>(
    null
  );
  const list = useAsyncList<{ [key: string]: string }>({
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
          <Autocomplete.Item key={item.name}>{item.name}</Autocomplete.Item>
        )}
      </Autocomplete>
      {result === null ? null : result.length > 0 ? (
        <Table aria-label="Character results" selectionMode="none" stretch>
          <Table.Header columns={columns}>
            {column => <Table.Column>{column.name}</Table.Column>}
          </Table.Header>
          <Table.Body items={result}>
            {item => (
              <Table.Row key={item.name}>
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
