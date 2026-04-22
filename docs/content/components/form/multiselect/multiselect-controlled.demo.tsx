'use client';

import { useState } from 'react';
import { Tag, Text } from '@marigold/components';

const ticketPriorities = [
  { id: 'low', label: 'Low Priority' },
  { id: 'medium', label: 'Medium Priority' },
  { id: 'high', label: 'High Priority' },
  { id: 'critical', label: 'Critical Issue' },
];

export default () => {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  return (
    <div className="flex flex-col gap-4">
      <Tag.Group
        label="Ticket Priorities"
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={keys =>
          setSelected(
            keys === 'all'
              ? new Set(ticketPriorities.map(p => p.id))
              : new Set(keys as Set<string>)
          )
        }
      >
        {ticketPriorities.map(p => (
          <Tag key={p.id} id={p.id} isDisabled={p.id === 'critical'}>
            {p.label}
          </Tag>
        ))}
      </Tag.Group>
      <Text>
        Selected: {selected.size > 0 ? [...selected].join(', ') : 'none'}
      </Text>
    </div>
  );
};
