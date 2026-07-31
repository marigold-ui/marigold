import { useState } from 'react';
import { Checkbox, Select, Stack, Tag, Text } from '@marigold/components';

const types = ['Bar', 'Café', 'Club', 'Concert hall', 'Lounge', 'Theater'];

export default () => {
  // The operator is the single source of truth for polarity: the same selection
  // is read as an include ("is any of") or an exclude ("is none of"). Switching
  // the operator keeps the checked values intact and only flips their meaning,
  // so users can move a filter from include to exclude without re-picking.
  const [operator, setOperator] = useState<'include' | 'exclude'>('include');
  const [selected, setSelected] = useState<string[]>(['Bar', 'Café']);

  const summary =
    selected.length === 0
      ? null
      : operator === 'include'
        ? `Type is ${selected.join(', ')}`
        : `Type is not ${selected.join(', ')}`;

  return (
    <Stack space={6}>
      <Stack space={3}>
        <Select
          aria-label="Venue type operator"
          width={40}
          defaultSelectedKey="include"
          onChange={key => setOperator(key as 'include' | 'exclude')}
        >
          <Select.Option id="include">Is any of</Select.Option>
          <Select.Option id="exclude">Is none of</Select.Option>
        </Select>

        <Checkbox.Group
          label="Venue Type"
          value={selected}
          onChange={setSelected}
        >
          {types.map(type => (
            <Checkbox key={type} value={type} label={type} />
          ))}
        </Checkbox.Group>
      </Stack>

      <Tag.Group
        label="Applied Filters"
        onRemove={() => setSelected([])}
        emptyState={() => (
          <Text variant="muted" fontSize="sm" fontStyle="italic">
            None
          </Text>
        )}
      >
        {summary ? <Tag id="type">{summary}</Tag> : null}
      </Tag.Group>
    </Stack>
  );
};
