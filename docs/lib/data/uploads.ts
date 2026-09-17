export const uploads = [
  { id: 'report', name: 'Report Q1.pdf', detail: '3 days ago · 2.1 MB' },
  { id: 'season', name: 'Season plan.xlsx', detail: 'Yesterday · 640 KB' },
  {
    id: 'contract',
    name: 'Venue contract.pdf',
    detail: '2 weeks ago · 1.2 MB',
  },
  { id: 'floorplan', name: 'Floor plan.png', detail: '3 weeks ago · 4.7 MB' },
  { id: 'rider', name: 'Tech rider.pdf', detail: 'Last month · 320 KB' },
  { id: 'invoice', name: 'Invoice 2291.pdf', detail: 'Last month · 88 KB' },
] as const;

export type Upload = (typeof uploads)[number];
