export const teams = [
  {
    id: 'programming',
    name: 'Programming & Booking',
    description:
      'Books the acts and plans the season, from first offer to signed contract.',
    memberIds: ['headliner', 'encore'],
  },
  {
    id: 'venues',
    name: 'Venue Operations',
    description:
      'Runs the venues on show day: stages, crews, safety and the building itself.',
    memberIds: ['soundcheck', 'cue', 'rigger', 'nightshift'],
  },
  {
    id: 'ticketing',
    name: 'Ticketing & Box Office',
    description:
      'Sells the tickets, builds the seating plans and looks after guests on the night.',
    memberIds: ['turnstile', 'seatmap', 'doors', 'clipboard'],
  },
  {
    id: 'marketing',
    name: 'Marketing & Partnerships',
    description:
      'Fills the seats: campaigns, social media, sponsors and press.',
    memberIds: ['hype', 'sponsor'],
  },
  {
    // No members yet, so the Teams example shows its empty state.
    id: 'finance',
    name: 'Finance',
    description:
      'Pays artists and venues, invoices partners and keeps the books.',
    memberIds: [],
  },
] as const;

export type Team = (typeof teams)[number];

export const teamName = (id: string) =>
  teams.find(team => team.id === id)?.name ?? id;
