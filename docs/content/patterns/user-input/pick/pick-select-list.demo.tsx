import { useMemo, useState } from 'react';
import type { Key } from '@react-types/shared';
import {
  Button,
  Dialog,
  EmptyState,
  Inline,
  Scrollable,
  SearchField,
  Select,
  SelectList,
  Stack,
  Tag,
  Text,
} from '@marigold/components';

interface Country {
  id: string;
  name: string;
  region: string;
}

// A stand-in for the couple hundred countries a real availability picker faces.
const countries: Country[] = [
  { id: 'germany', name: 'Germany', region: 'Europe' },
  { id: 'france', name: 'France', region: 'Europe' },
  { id: 'spain', name: 'Spain', region: 'Europe' },
  { id: 'italy', name: 'Italy', region: 'Europe' },
  { id: 'netherlands', name: 'Netherlands', region: 'Europe' },
  { id: 'belgium', name: 'Belgium', region: 'Europe' },
  { id: 'austria', name: 'Austria', region: 'Europe' },
  { id: 'switzerland', name: 'Switzerland', region: 'Europe' },
  { id: 'sweden', name: 'Sweden', region: 'Europe' },
  { id: 'poland', name: 'Poland', region: 'Europe' },
  { id: 'portugal', name: 'Portugal', region: 'Europe' },
  { id: 'ireland', name: 'Ireland', region: 'Europe' },
  { id: 'united-states', name: 'United States', region: 'Americas' },
  { id: 'canada', name: 'Canada', region: 'Americas' },
  { id: 'mexico', name: 'Mexico', region: 'Americas' },
  { id: 'brazil', name: 'Brazil', region: 'Americas' },
  { id: 'argentina', name: 'Argentina', region: 'Americas' },
  { id: 'chile', name: 'Chile', region: 'Americas' },
  { id: 'colombia', name: 'Colombia', region: 'Americas' },
  { id: 'japan', name: 'Japan', region: 'Asia' },
  { id: 'south-korea', name: 'South Korea', region: 'Asia' },
  { id: 'india', name: 'India', region: 'Asia' },
  { id: 'singapore', name: 'Singapore', region: 'Asia' },
  { id: 'thailand', name: 'Thailand', region: 'Asia' },
  { id: 'indonesia', name: 'Indonesia', region: 'Asia' },
  { id: 'philippines', name: 'Philippines', region: 'Asia' },
  { id: 'south-africa', name: 'South Africa', region: 'Africa' },
  { id: 'nigeria', name: 'Nigeria', region: 'Africa' },
  { id: 'kenya', name: 'Kenya', region: 'Africa' },
  { id: 'egypt', name: 'Egypt', region: 'Africa' },
  { id: 'morocco', name: 'Morocco', region: 'Africa' },
  { id: 'australia', name: 'Australia', region: 'Oceania' },
  { id: 'new-zealand', name: 'New Zealand', region: 'Oceania' },
  {
    id: 'united-arab-emirates',
    name: 'United Arab Emirates',
    region: 'Middle East',
  },
  { id: 'israel', name: 'Israel', region: 'Middle East' },
  { id: 'turkey', name: 'Turkey', region: 'Middle East' },
];

const regions = [
  'Europe',
  'Americas',
  'Asia',
  'Africa',
  'Oceania',
  'Middle East',
];

interface PickBodyProps {
  initial: Set<Key>;
  onConfirm: (keys: Set<Key>) => void;
}

const PickCountriesBody = ({ initial, onConfirm }: PickBodyProps) => {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState<Key | null>('all');
  const [selected, setSelected] = useState<Set<Key>>(() => new Set(initial));

  const results = useMemo(() => {
    const query = search.trim().toLowerCase();
    return countries.filter(country => {
      const matchesSearch =
        !query || country.name.toLowerCase().includes(query);
      const matchesRegion =
        region == null || region === 'all' || country.region === region;
      return matchesSearch && matchesRegion;
    });
  }, [search, region]);

  // SelectList reports the visible selection as a Key[]. Merge it with the
  // staged keys that are currently filtered out of view, so narrowing the list
  // by search or region never drops what is already staged.
  const onChange = (keys: Key[]) => {
    const visibleIds = new Set(results.map(country => country.id));
    setSelected(prev => {
      const offView = [...prev].filter(key => !visibleIds.has(String(key)));
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
  const staged = countries.filter(country => selected.has(country.id));

  return (
    <>
      <Dialog.Title>Select countries</Dialog.Title>
      <Dialog.Content>
        <Stack space={4}>
          {/* Search and the region filter narrow the visible rows together;
              neither touches the staged selection tracked in `selected`. */}
          <Inline space={2} alignY="input">
            <SearchField
              aria-label="Search countries"
              placeholder="Search countries"
              value={search}
              onChange={setSearch}
              width={56}
            />
            <Select
              aria-label="Filter by region"
              value={region}
              onChange={setRegion}
              width={40}
            >
              <Select.Option id="all">All regions</Select.Option>
              {regions.map(r => (
                <Select.Option key={r} id={r}>
                  {r}
                </Select.Option>
              ))}
            </Select>
          </Inline>

          {/* The staged set stays on screen as removable tags no matter what
              the search and filter are doing, including when the list below is
              empty. Removing a tag unstages that country. */}
          {staged.length > 0 && (
            <Tag.Group
              label={`Staged (${staged.length})`}
              selectionMode="none"
              onRemove={unstage}
            >
              {staged.map(country => (
                <Tag key={country.id} id={country.id}>
                  {country.name}
                </Tag>
              ))}
            </Tag.Group>
          )}

          {/* Countries are labels with no detail worth scanning, so the results
              collection is a SelectList rather than a Table. Only the
              collection differs from the venue pick above. */}
          <Scrollable height="288px">
            <SelectList
              aria-label="Countries"
              selectionMode="multiple"
              items={results}
              selectedKeys={selected}
              onChange={onChange}
              emptyState={
                <EmptyState
                  title="No countries match"
                  description="Try a different search or region. Anything you already staged stays listed above."
                />
              }
            >
              {(country: Country) => (
                <SelectList.Option id={country.id}>
                  {country.name}
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
        <Button variant="primary" onPress={() => onConfirm(selected)}>
          Add {staged.length} {staged.length === 1 ? 'country' : 'countries'}
        </Button>
      </Dialog.Actions>
    </>
  );
};

export default () => {
  const [added, setAdded] = useState<Set<Key>>(new Set());
  const addedNames = countries
    .filter(country => added.has(country.id))
    .map(country => country.name);

  return (
    <Stack space={5} alignX="left">
      <Dialog.Trigger>
        <Button variant="primary">Add countries</Button>
        <Dialog size="medium" closeButton>
          {({ close }) => (
            <PickCountriesBody
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
          ? 'No countries added yet.'
          : `Available in ${addedNames.length}: ${addedNames.join(', ')}`}
      </Text>
    </Stack>
  );
};
