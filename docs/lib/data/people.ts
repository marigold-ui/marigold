export interface Person {
  id: string;
  name: string;
  jobTitle: string;
  avatar: string;
}

export const people: Person[] = [
  {
    id: 'alice',
    name: 'Alice Johnson',
    jobTitle: 'Product Manager',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 'bob',
    name: 'Bob Smith',
    jobTitle: 'Senior Developer',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: 'charlie',
    name: 'Charlie Davis',
    jobTitle: 'UX Designer',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 'diana',
    name: 'Diana Martinez',
    jobTitle: 'QA Engineer',
    avatar: 'https://i.pravatar.cc/150?img=9',
  },
  {
    id: 'evan',
    name: 'Evan Wilson',
    jobTitle: 'DevOps Engineer',
    avatar: 'https://i.pravatar.cc/150?img=13',
  },
  {
    id: 'fiona',
    name: 'Fiona Chen',
    jobTitle: 'Data Analyst',
    avatar: 'https://i.pravatar.cc/150?img=20',
  },
  {
    id: 'george',
    name: 'George Brown',
    jobTitle: 'Backend Developer',
    avatar: 'https://i.pravatar.cc/150?img=14',
  },
  {
    id: 'hannah',
    name: 'Hannah White',
    jobTitle: 'Frontend Developer',
    avatar: 'https://i.pravatar.cc/150?img=24',
  },
];
