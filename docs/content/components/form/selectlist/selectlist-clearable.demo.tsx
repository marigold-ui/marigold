import { useState } from 'react';
import { Badge, Inline, SelectList, Text } from '@marigold/components';

const filters = [
  {
    id: 'open',
    label: 'Open tickets',
    count: 24,
    description:
      'Tickets that still need a first response. Sorted by oldest first to keep your SLA on track.',
  },
  {
    id: 'pending',
    label: 'Awaiting customer',
    count: 9,
    description:
      'Tickets waiting on a reply from the customer. Auto-closes after 7 days of inactivity.',
  },
  {
    id: 'escalated',
    label: 'Escalated',
    count: 3,
    description:
      'Tickets handed off to engineering or finance. Comments here trigger a Slack notification.',
  },
  {
    id: 'resolved',
    label: 'Resolved this week',
    count: 142,
    description:
      'Tickets closed in the last 7 days. Useful for retros and weekly reporting.',
  },
];

export default () => {
  const [status, setStatus] = useState<string | null>(null);

  return (
    <SelectList
      label="Filter by status"
      description='Pick a queue to focus on, or click the active row again to clear the filter and see "All tickets".'
      selectionMode="single"
      disallowEmptySelection={false}
      selectedKeys={status ? [status] : []}
      onChange={key => setStatus(key as string | null)}
    >
      {filters.map(filter => (
        <SelectList.Option
          key={filter.id}
          id={filter.id}
          textValue={filter.label}
        >
          <Text slot="label">
            <Inline space={2} alignY="center">
              {filter.label}
              <Badge variant="default">{filter.count}</Badge>
            </Inline>
          </Text>
          <Text slot="description">{filter.description}</Text>
        </SelectList.Option>
      ))}
    </SelectList>
  );
};
