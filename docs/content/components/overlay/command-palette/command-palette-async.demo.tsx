import { CommandPalette, useAsyncList } from '@marigold/components';

interface Character {
  name: string;
  url: string;
}

export default () => {
  const list = useAsyncList<Character>({
    async load({ signal, filterText }) {
      if (!filterText) return { items: [] };
      const res = await fetch(
        `https://swapi.py4e.com/api/people/?search=${encodeURIComponent(filterText)}`,
        { signal }
      );
      const json = (await res.json()) as { results: Character[] };
      return { items: json.results };
    },
  });

  return (
    <CommandPalette
      shortcut={false}
      filter={false}
      inputValue={list.filterText}
      onInputChange={list.setFilterText}
    >
      <CommandPalette.Trigger>Search characters…</CommandPalette.Trigger>
      <CommandPalette.Content>
        <CommandPalette.Input placeholder="Type a Star Wars name…" />
        <CommandPalette.List items={list.items}>
          {(item: Character) => (
            <CommandPalette.Item id={item.url}>{item.name}</CommandPalette.Item>
          )}
        </CommandPalette.List>
        {list.isLoading && (
          <CommandPalette.Loading>Searching…</CommandPalette.Loading>
        )}
        <CommandPalette.Empty>
          {list.filterText ? 'No characters found.' : 'Start typing to search.'}
        </CommandPalette.Empty>
      </CommandPalette.Content>
    </CommandPalette>
  );
};
