import { useState } from 'react';
import { Checkbox, Inline, Stack, Text } from '@marigold/components';

const channels = [
  'Box office',
  'Call center',
  'Mobile app',
  'Partner network',
  'Web shop',
];

export default () => {
  const [selected, setSelected] = useState(['Web shop']);
  const allSelected = selected.length === channels.length;

  return (
    <Stack space={3}>
      <Checkbox
        aria-label={`Select all ${channels.length} sales channels`}
        // Tie the standalone control to the group it toggles, so the
        // relationship is programmatic and not left to visual proximity.
        aria-controls="sales-channels" // [!code highlight]
        label={
          <Inline space={2} alignY="center">
            Select all <Text variant="muted">({channels.length})</Text>
          </Inline>
        }
        checked={allSelected}
        indeterminate={selected.length > 0 && !allSelected}
        onChange={checked => setSelected(checked ? [...channels] : [])}
      />
      <Checkbox.Group
        id="sales-channels" // [!code highlight]
        aria-label="Sales channels"
        value={selected}
        onChange={setSelected}
      >
        {channels.map(channel => (
          <Checkbox key={channel} value={channel} label={channel} />
        ))}
      </Checkbox.Group>
    </Stack>
  );
};
