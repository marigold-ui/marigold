export const people = [
  {
    id: 'alice',
    name: 'Alice Johnson',
    position: 'Product Manager',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 'bob',
    name: 'Bob Smith',
    position: 'Senior Developer',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: 'charlie',
    name: 'Charlie Davis',
    position: 'UX Designer',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 'diana',
    name: 'Diana Martinez',
    position: 'QA Engineer',
    avatar: 'https://i.pravatar.cc/150?img=9',
  },
  {
    id: 'evan',
    name: 'Evan Wilson',
    position: 'DevOps Engineer',
    avatar: 'https://i.pravatar.cc/150?img=13',
  },
  {
    id: 'fiona',
    name: 'Fiona Chen',
    position: 'Data Analyst',
    avatar: 'https://i.pravatar.cc/150?img=20',
  },
  {
    id: 'george',
    name: 'George Brown',
    position: 'Backend Developer',
    avatar: 'https://i.pravatar.cc/150?img=14',
  },
  {
    id: 'hannah',
    name: 'Hannah White',
    position: 'Frontend Developer',
    avatar: 'https://i.pravatar.cc/150?img=24',
  },
] as const;

export type Person = (typeof people)[number];
