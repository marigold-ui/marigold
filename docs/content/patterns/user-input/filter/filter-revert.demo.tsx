import type { Key } from 'react';
import { useState } from 'react';
import { Button, Stack, Tag } from '@marigold/components';

const items = [
  {
    id: 'type',
    name: 'Type is Club or Lounge',
  },
  {
    id: 'rating',
    name: 'Rating is 3 or more',
  },
  {
    id: 'traits',
    name: 'Traits are cheap, hype (+5 more)',
  },
] satisfies { id: string; name: string }[];

export default () => {
  const [filter, setFilter] = useState(items);

  const onRemove = (keys: Set<Key>) => {
    setFilter(prevItems => prevItems.filter(item => !keys.has(item.id)));
  };

  return (
    <Stack space={6} alignX="right">
      {/* Rendered only while filters are active, no placeholder at rest */}
      {filter.length > 0 && (
        <Tag.Group
          label="Applied Filters"
          items={filter}
          onRemove={onRemove}
          removeAll
        >
          {filter.map(item => (
            <Tag key={item.id} id={item.id}>
              {item.name}
            </Tag>
          ))}
        </Tag.Group>
      )}

      <Button size="small" onPress={() => setFilter(items)}>
        Reset Demo
      </Button>
    </Stack>
  );
};
