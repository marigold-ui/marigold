import { useMemo, useState } from 'react';
import type { Key } from '@react-types/shared';
import {
  Button,
  Description,
  Dialog,
  EmptyState,
  Inline,
  Panel,
  Scrollable,
  SearchField,
  Select,
  SelectList,
  Stack,
  Tag,
  Text,
  TextValue,
} from '@marigold/components';

interface Person {
  id: string;
  name: string;
  email: string;
  team: string;
}

// A stand-in for the directory a real access picker searches through.
const people: Person[] = [
  {
    id: 'mara-lindqvist',
    name: 'Mara Lindqvist',
    email: 'mara.lindqvist@northwind.co',
    team: 'Engineering',
  },
  {
    id: 'diego-fuentes',
    name: 'Diego Fuentes',
    email: 'diego.fuentes@northwind.co',
    team: 'Engineering',
  },
  {
    id: 'priya-nair',
    name: 'Priya Nair',
    email: 'priya.nair@northwind.co',
    team: 'Engineering',
  },
  {
    id: 'tomasz-kowalski',
    name: 'Tomasz Kowalski',
    email: 'tomasz.kowalski@northwind.co',
    team: 'Engineering',
  },
  {
    id: 'yuki-tanaka',
    name: 'Yuki Tanaka',
    email: 'yuki.tanaka@northwind.co',
    team: 'Design',
  },
  {
    id: 'amara-okafor',
    name: 'Amara Okafor',
    email: 'amara.okafor@northwind.co',
    team: 'Design',
  },
  {
    id: 'lena-hofmann',
    name: 'Lena Hofmann',
    email: 'lena.hofmann@northwind.co',
    team: 'Design',
  },
  {
    id: 'sofia-rossi',
    name: 'Sofia Rossi',
    email: 'sofia.rossi@northwind.co',
    team: 'Marketing',
  },
  {
    id: 'ben-carter',
    name: 'Ben Carter',
    email: 'ben.carter@northwind.co',
    team: 'Marketing',
  },
  {
    id: 'noah-weiss',
    name: 'Noah Weiss',
    email: 'noah.weiss@northwind.co',
    team: 'Sales',
  },
  {
    id: 'ingrid-sorensen',
    name: 'Ingrid Sørensen',
    email: 'ingrid.sorensen@northwind.co',
    team: 'Sales',
  },
  {
    id: 'hana-kim',
    name: 'Hana Kim',
    email: 'hana.kim@northwind.co',
    team: 'Support',
  },
];

const teams = ['Engineering', 'Design', 'Marketing', 'Sales', 'Support'];

interface PickBodyProps {
  initial: Set<Key>;
  onConfirm: (keys: Set<Key>) => void;
}

const PickPeopleBody = ({ initial, onConfirm }: PickBodyProps) => {
  const [search, setSearch] = useState('');
  const [team, setTeam] = useState<Key | null>('all');
  const [selected, setSelected] = useState<Set<Key>>(() => new Set(initial));

  const results = useMemo(() => {
    const query = search.trim().toLowerCase();
    return people.filter(person => {
      const matchesSearch =
        !query ||
        `${person.name} ${person.email}`.toLowerCase().includes(query);
      const matchesTeam =
        team == null || team === 'all' || person.team === team;
      return matchesSearch && matchesTeam;
    });
  }, [search, team]);

  // SelectList reports the visible selection as a Key[]. Merge it with the
  // staged keys that are currently filtered out of view, so narrowing the list
  // by search or team never drops what is already staged.
  const onChange = (keys: Key[]) => {
    const visibleIds = new Set<Key>(results.map(person => person.id));
    setSelected(prev => {
      const offView = [...prev].filter(key => !visibleIds.has(key));
      return new Set<Key>([...offView, ...keys]);
    });
  };

  const unstage = (keys: Set<Key>) => {
    setSelected(prev => {
      const next = new Set<Key>(prev);
      keys.forEach(key => next.delete(key));
      return next;
    });
  };

  // Derived from `selected` alone, so the staged tags are independent of the
  // search and filter and survive the list narrowing to nothing.
  const staged = people.filter(person => selected.has(person.id));

  return (
    <>
      <Dialog.Title>Select people</Dialog.Title>
      <Dialog.Content>
        <Stack space={4}>
          {/* Search and the team filter narrow the visible rows together;
              neither touches the staged selection tracked in `selected`. */}
          <Inline space={2} alignY="input">
            <SearchField
              aria-label="Search people"
              placeholder="Search by name or email"
              value={search}
              onChange={setSearch}
              width={56}
            />
            <Select
              aria-label="Filter by team"
              value={team}
              onChange={setTeam}
              width={40}
            >
              <Select.Option id="all">All teams</Select.Option>
              {teams.map(t => (
                <Select.Option key={t} id={t}>
                  {t}
                </Select.Option>
              ))}
            </Select>
          </Inline>

          {/* The staged set stays on screen as removable tags no matter what
              the search and filter are doing, including when the list below is
              empty. Removing a tag unstages that person. */}
          {staged.length > 0 && (
            <Tag.Group
              label={`Staged (${staged.length})`}
              selectionMode="none"
              onRemove={unstage}
              collapseAt={6}
            >
              {staged.map(person => (
                <Tag key={person.id} id={person.id}>
                  {person.name}
                </Tag>
              ))}
            </Tag.Group>
          )}

          {/* People are labels with a supporting email, not a grid of columns,
              so the results collection is a SelectList rather than a Table.
              Only the collection differs from the venue pick above. */}
          <Scrollable height="288px">
            <SelectList
              aria-label="People"
              selectionMode="multiple"
              items={results}
              selectedKeys={selected}
              onChange={onChange}
              emptyState={
                <EmptyState
                  title="No people match"
                  description="Try a different search or team. Anyone you already staged stays listed above."
                />
              }
            >
              {(person: Person) => (
                <SelectList.Option id={person.id} textValue={person.name}>
                  <TextValue>{person.name}</TextValue>
                  <Description>{person.email}</Description>
                </SelectList.Option>
              )}
            </SelectList>
          </Scrollable>
        </Stack>
      </Dialog.Content>
      <Dialog.Actions>
        <Button variant="secondary" slot="close">
          Cancel
        </Button>
        {/* At least one person is required, so an empty set can never commit. */}
        <Button
          variant="primary"
          disabled={staged.length === 0}
          onPress={() => onConfirm(selected)}
        >
          {staged.length === 0
            ? 'Add people'
            : `Add ${staged.length} ${staged.length === 1 ? 'person' : 'people'}`}
        </Button>
      </Dialog.Actions>
    </>
  );
};

export default () => {
  const [added, setAdded] = useState<Set<Key>>(new Set());
  const addedNames = people
    .filter(person => added.has(person.id))
    .map(person => person.name);

  return (
    <Panel aria-label="Access">
      <Panel.Content>
        <Stack space={5} alignX="left">
          <Dialog.Trigger>
            <Button variant="primary">Add people</Button>
            <Dialog size="medium" closeButton>
              {({ close }) => (
                <PickPeopleBody
                  initial={added}
                  onConfirm={keys => {
                    setAdded(keys);
                    close();
                  }}
                />
              )}
            </Dialog>
          </Dialog.Trigger>
          <Text>
            {addedNames.length === 0
              ? 'No people added yet.'
              : `Access granted to: ${addedNames.join(', ')}`}
          </Text>
        </Stack>
      </Panel.Content>
    </Panel>
  );
};
