import { Select } from '@marigold/components';

const statuses = [
  { id: 'active', name: 'Active' },
  { id: 'draft', name: 'Draft' },
  { id: 'archived', name: 'Archived' },
  { id: 'scheduled', name: 'Scheduled' },
];

export default () => (
  <Select
    aria-label="Status"
    selectionMode="multiple"
    placeholder="Status"
    width={36}
    items={statuses}
    // Show the dimension label and a count, never the individual values, so the
    // trigger stays compact and the values live in the applied-filter tags. The
    // placeholder shows the bare label ("Status") while nothing is selected.
    renderValue={items => `Status (${items.length})`}
  >
    {(item: (typeof statuses)[number]) => (
      <Select.Option id={item.id}>{item.name}</Select.Option>
    )}
  </Select>
);
