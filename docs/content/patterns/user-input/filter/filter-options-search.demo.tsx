import { useState } from 'react';
import { Checkbox, SearchField, Stack, Text } from '@marigold/components';

const genres = [
  'Blues',
  'Classical',
  'Country',
  'Electronic',
  'Folk',
  'Hip-Hop',
  'Indie',
  'Jazz',
  'Metal',
  'Pop',
  'Punk',
  'Reggae',
  'Rock',
  'Soul',
];

export default () => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(['Rock', 'Jazz']);

  const visible = genres.filter(genre =>
    genre.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <Stack space={4}>
      <SearchField
        aria-label="Search genres"
        placeholder="Search genres"
        value={query}
        onChange={setQuery}
      />
      {visible.length > 0 ? (
        <Checkbox.Group
          aria-label="Genre"
          value={selected}
          onChange={setSelected}
        >
          {visible.map(genre => (
            <Checkbox key={genre} value={genre} label={genre} />
          ))}
        </Checkbox.Group>
      ) : (
        <Text variant="muted" fontSize="sm" fontStyle="italic">
          No genres match your search.
        </Text>
      )}
    </Stack>
  );
};
