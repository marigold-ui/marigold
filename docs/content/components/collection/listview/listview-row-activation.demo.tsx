import { Description, ListView, TextValue } from '@marigold/components';

const uploads = [
  { id: 'report', name: 'Report Q1.pdf', detail: '3 days ago · 2.1 MB' },
  { id: 'season', name: 'Season plan.xlsx', detail: 'Yesterday · 640 KB' },
  {
    id: 'contract',
    name: 'Venue contract.pdf',
    detail: '2 weeks ago · 1.2 MB',
  },
];

export default () => (
  <ListView
    aria-label="Uploads"
    selectionMode="multiple"
    // Reached only while nothing is selected.
    onAction={key => alert(`Opened ${uploads.find(u => u.id === key)?.name}`)} // [!code highlight]
    items={uploads}
  >
    {(upload: (typeof uploads)[number]) => (
      <ListView.Item textValue={upload.name}>
        <TextValue>{upload.name}</TextValue>
        <Description>{upload.detail}</Description>
      </ListView.Item>
    )}
  </ListView>
);
