import { useState } from 'react';
import { Checkbox, Stack, Tag, Text } from '@marigold/components';

const types = ['Bar', 'Café', 'Club', 'Concert hall', 'Lounge', 'Theater'];

export default () => {
  const [selected, setSelected] = useState(
    types.filter(type => type !== 'Bar')
  );
  const excluded = types.filter(type => !selected.includes(type));

  return (
    <Stack space={6}>
      <Checkbox.Group
        label="Venue Type"
        value={selected}
        onChange={setSelected}
      >
        {types.map(type => (
          <Checkbox key={type} value={type} label={type} />
        ))}
      </Checkbox.Group>

      <Tag.Group
        label="Applied Filters"
        onRemove={() => setSelected([...types])}
        emptyState={() => (
          <Text variant="muted" fontSize="sm" fontStyle="italic">
            None
          </Text>
        )}
      >
        {excluded.length > 0 ? (
          <Tag id="type">
            {selected.length === 0
              ? 'No venue types'
              : `All types except ${excluded.join(', ')}`}
          </Tag>
        ) : null}
      </Tag.Group>
    </Stack>
  );
};
