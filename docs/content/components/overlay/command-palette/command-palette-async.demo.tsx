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
    <CommandPalette.Trigger shortcut={false}>
      <CommandPalette.Button>Search characters…</CommandPalette.Button>
      <CommandPalette
        placeholder="Type a Star Wars name…"
        filter={false}
        inputValue={list.filterText}
        onInputChange={list.setFilterText}
        items={list.items}
        loading={list.isLoading}
        emptyState={
          list.filterText ? 'No characters found.' : 'Start typing to search.'
        }
      >
        {(item: Character) => (
          <CommandPalette.Item id={item.url}>{item.name}</CommandPalette.Item>
        )}
      </CommandPalette>
    </CommandPalette.Trigger>
  );
};
