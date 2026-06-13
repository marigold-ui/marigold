export const teams = [
  {
    id: 'design',
    name: 'Design Systems',
    description:
      'Owns the component library, design tokens, and accessibility guidelines.',
    memberIds: ['chippy', 'token', 'sandy'],
  },
  {
    id: 'platform',
    name: 'Platform Engineering',
    description: 'Builds and runs the infrastructure, pipelines, and APIs.',
    memberIds: ['pipes', 'gizmo'],
  },
  {
    id: 'frontend',
    name: 'Frontend Guild',
    description:
      'Ships product surfaces and keeps the front end fast and reliable.',
    memberIds: ['crash', 'flex'],
  },
  {
    id: 'data',
    name: 'Data & Insights',
    description: 'Turns raw events into dashboards, metrics, and reports.',
    memberIds: ['query'],
  },
] as const;

export type Team = (typeof teams)[number];

export const teamName = (id: string) =>
  teams.find(team => team.id === id)?.name ?? id;
