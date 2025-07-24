import { Autocomplete, Center, useAsyncList } from '@marigold/components';

export default function Example() {
  const list = useAsyncList<{ name: string }>({
    async load({ signal, filterText }) {
      const res = await fetch(
        `https://swapi.py4e.com/api/people/?search=${filterText}`,
        { signal }
      );
      const json = await res.json();

      return {
        items: json.results,
      };
    },
  });

  return (
    <Autocomplete
      label="Search Star Wars Characters"
      items={list.items}
      value={list.filterText}
      onChange={list.setFilterText}
      loading={list.isLoading}
      allowsEmptyCollection
      emptyState={<Center>No results found</Center>}
    >
      {(item: any) => (
        <Autocomplete.Option id={item.name}>{item.name}</Autocomplete.Option>
      )}
    </Autocomplete>
  );
}
