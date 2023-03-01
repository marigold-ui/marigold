import { Key, useMemo, useState } from 'react';
import { Autocomplete, Stack, Text } from '@marigold/components';

export const AutocompleteControlledDemo = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const vegetables = [
    { id: 'spinach', name: 'Spinach' },
    { id: 'carrots', name: 'Carrots' },
    { id: 'broccoli', name: 'Broccoli' },
    { id: 'garlic', name: 'Garlic' },
    { id: 'brussels-sprouts', name: 'Brussels Sprouts' },
    { id: 'kale', name: 'Kale' },
    { id: 'peas', name: 'Peas' },
    { id: 'beets', name: 'Beets' },
  ];

  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState<[Key | null, string | null]>([
    '',
    '',
  ]);
  const filteredVeggies = useMemo(
    () =>
      vegetables.filter(item =>
        item.name
          .toLocaleLowerCase()
          .replace(/\s/g, '')
          .includes(input.toLocaleLowerCase().replace(/\s/g, ''))
      ),
    [vegetables, input]
  );

  return (
    <Stack space="large">
      <Autocomplete
        label="Favorite vegetable:"
        items={filteredVeggies}
        value={input}
        onChange={setInput}
        onSubmit={(key, val) => setSubmitted([key, val])}
      >
        {(item: (typeof vegetables)[number]) => (
          <Autocomplete.Item>{item.name}</Autocomplete.Item>
        )}
      </Autocomplete>
      <Stack>
        <Text fontWeight="900">User input: "{input}"</Text>
        <Text fontWeight="900">User subbmitted: "{submitted}"</Text>
      </Stack>
    </Stack>
  );
};
