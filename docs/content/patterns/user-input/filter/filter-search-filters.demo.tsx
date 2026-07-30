import { useState } from 'react';
import {
  Accordion,
  Checkbox,
  SearchField,
  Stack,
  Text,
} from '@marigold/components';

// Enough filter groups that finding one by name beats scrolling the panel.
const groups = [
  {
    id: 'category',
    label: 'Category',
    options: ['Concerts', 'Festivals', 'Theater', 'Workshops'],
  },
  {
    id: 'status',
    label: 'Status',
    options: ['Published', 'Draft', 'Archived'],
  },
  {
    id: 'channel',
    label: 'Sales Channel',
    options: ['Web shop', 'Box office', 'Partner network'],
  },
  {
    id: 'venue',
    label: 'Venue',
    options: ['Arena', 'Club', 'Open Air', 'Theater Hall'],
  },
  {
    id: 'city',
    label: 'City',
    options: ['Berlin', 'Hamburg', 'Munich', 'Cologne'],
  },
  {
    id: 'organizer',
    label: 'Organizer',
    options: ['In-house', 'Agency', 'Partner'],
  },
  {
    id: 'language',
    label: 'Language',
    options: ['German', 'English', 'French'],
  },
  {
    id: 'accessibility',
    label: 'Accessibility',
    options: ['Wheelchair access', 'Hearing loop', 'Companion ticket'],
  },
  {
    id: 'audience',
    label: 'Audience',
    options: ['All ages', 'Adults only', 'Family'],
  },
];

export default () => {
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();
  const visible = groups.filter(
    group =>
      q === '' ||
      group.label.toLowerCase().includes(q) ||
      group.options.some(option => option.toLowerCase().includes(q))
  );

  return (
    <Stack space={4}>
      <SearchField
        aria-label="Find a filter"
        placeholder="Find a filter..."
        value={query}
        onChange={setQuery}
      />
      {visible.length > 0 ? (
        // Re-key by the query so every match expands while searching. The
        // search field sits outside the keyed subtree, so it keeps focus.
        <Accordion
          key={q}
          allowsMultipleExpanded
          defaultExpandedKeys={
            q ? visible.map(group => group.id) : ['category']
          }
        >
          {visible.map(group => (
            <Accordion.Item key={group.id} id={group.id}>
              <Accordion.Header>{group.label}</Accordion.Header>
              <Accordion.Content>
                <Checkbox.Group aria-label={group.label}>
                  {group.options.map(option => (
                    <Checkbox key={option} value={option} label={option} />
                  ))}
                </Checkbox.Group>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion>
      ) : (
        <Text variant="muted" fontSize="sm" fontStyle="italic">
          No filters match your search.
        </Text>
      )}
    </Stack>
  );
};
