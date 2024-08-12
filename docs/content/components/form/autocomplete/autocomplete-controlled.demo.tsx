import { useMemo, useState } from 'react';
import { Autocomplete, Stack, Text } from '@marigold/components';

export default () => {
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
  const [submitted, setSubmitted] = useState<
    [string | number | null, string | number | null]
  >(['', '']);
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
    <Stack space={5}>
      <Autocomplete
        label="Favorite vegetable:"
        items={filteredVeggies}
        value={input}
        onChange={setInput}
        onSubmit={(id, val) => setSubmitted([id, val])}
      >
        {item => <Autocomplete.Item>{(item as any).name}</Autocomplete.Item>}
      </Autocomplete>
      <Stack>
        <Text weight="black">User input: "{input}"</Text>
        <Text weight="black">User subbmitted: "{submitted}"</Text>
      </Stack>
    </Stack>
  );
};
