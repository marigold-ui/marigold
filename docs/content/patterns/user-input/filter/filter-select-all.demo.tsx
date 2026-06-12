import { useState } from 'react';
import { Badge, Checkbox, Inline, Stack } from '@marigold/components';

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
        label={
          <Inline space={2} alignY="center">
            Select all <Badge>{channels.length}</Badge>
          </Inline>
        }
        checked={allSelected}
        indeterminate={selected.length > 0 && !allSelected}
        onChange={checked => setSelected(checked ? [...channels] : [])}
      />
      <Checkbox.Group
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
