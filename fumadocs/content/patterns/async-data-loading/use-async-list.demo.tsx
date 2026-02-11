import { useEffect, useState } from 'react';
import { Center, ComboBox, useAsyncList } from '@marigold/components';

export default function Example() {
  const [showLoading, setShowLoading] = useState(false);

  const list = useAsyncList<{ name: string }>({
    async load({ signal, filterText }) {
      const res = await fetch(
        `https://swapi.py4e.com/api/people/?search=${filterText}`,
        {
          signal,
        }
      );
      const json = await res.json();

      return {
        items: json.results,
      };
    },
  });

  // Only show loading after a short delay to avoid flicker for fast APIs
  useEffect(() => {
    if (list.isLoading) {
      const timer = setTimeout(() => setShowLoading(true), 500);
      return () => clearTimeout(timer);
    } else {
      queueMicrotask(() => setShowLoading(false));
    }
  }, [list.isLoading]);

  return (
    <ComboBox
      label="Search Star Wars Characters"
      items={list.items}
      value={list.filterText}
      onChange={list.setFilterText}
      loading={showLoading}
      allowsEmptyCollection
      emptyState={<Center>No results found</Center>}
    >
      {(item: any) => (
        <ComboBox.Option id={item.name}>{item.name}</ComboBox.Option>
      )}
    </ComboBox>
  );
}
