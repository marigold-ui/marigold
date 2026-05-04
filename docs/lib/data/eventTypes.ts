export const eventTypes = [
  {
    id: 'conference',
    label: 'Conference',
    description: 'Multi-track sessions with speakers and schedules',
  },
  {
    id: 'workshop',
    label: 'Workshop',
    description: 'Hands-on, limited capacity with registration',
  },
  {
    id: 'meetup',
    label: 'Meetup',
    description: 'Casual gathering, free or low-cost entry',
  },
  {
    id: 'festival',
    label: 'Festival',
    description: 'Multi-day event with multiple stages and vendors',
  },
  {
    id: 'concert',
    label: 'Concert',
    description: 'Single performance with seated or standing tickets',
  },
] as const;
