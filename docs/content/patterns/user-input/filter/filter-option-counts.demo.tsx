import { Checkbox, Inline, Text } from '@marigold/components';

const categories = [
  { value: 'concert', label: 'Concerts', count: 85 },
  { value: 'festival', label: 'Festivals', count: 31 },
  { value: 'theater', label: 'Theater', count: 24 },
  { value: 'workshop', label: 'Workshops', count: 12 },
  { value: 'reading', label: 'Readings', count: 3 },
];

export default () => (
  <Checkbox.Group label="Category" defaultValue={['concert']}>
    {categories.map(({ value, label, count }) => (
      <Checkbox
        key={value}
        value={value}
        label={
          <Inline space={2} alignY="center">
            {label}
            <Text variant="muted">({count})</Text>
          </Inline>
        }
      />
    ))}
  </Checkbox.Group>
);
