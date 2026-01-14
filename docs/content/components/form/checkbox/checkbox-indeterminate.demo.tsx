import { useState } from 'react';
import { Checkbox, Inset, Stack } from '@marigold/components';

const genres = {
  rock: 'Rock',
  pop: 'Pop',
  jazz: 'Jazz',
  hiphop: 'Hip-Hop',
  classical: 'Classical',
  country: 'Country',
  electronic: 'Electronic',
  rnb: 'R&B',
} as const;
const size = Object.keys(genres).length;

type Genres = keyof typeof genres;

export default () => {
  const [selected, setSelected] = useState<Genres[]>(['jazz', 'electronic']);
  const allProps = {
    indeterminate: selected.length > 0 && selected.length < size,
    checked: selected.length === size,
    onChange: () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      selected.length === size
        ? setSelected([])
        : setSelected(Object.keys(genres) as Genres[]);
    },
  };

  return (
    <Stack space={1}>
      <Checkbox {...allProps}>All</Checkbox>
      <Inset spaceX={4}>
        <Checkbox.Group
          aria-label="Favorite genres"
          value={selected}
          onChange={(keys: string[]) => setSelected(keys as Genres[])}
        >
          {Object.entries(genres).map(([value, label]) => (
            <Checkbox key={value} value={value} label={label} />
          ))}
        </Checkbox.Group>
      </Inset>
    </Stack>
  );
};
