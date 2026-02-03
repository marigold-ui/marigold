# Async Data Loading

_Learn how to implement async data loading patterns in interactive components._

Async data loading patterns provide clear guidelines for implementing components that fetch data from remote sources. These patterns ensure consistent user experience across `<ComboBox>`, `<Autocomplete>`, and other interactive components that work with dynamic data.

## Usage

There are two main approaches for async data loading:

**useAsyncList**: Built-in filtering and loading states, perfect for search-as-you-type functionality.

**React Query**: Advanced caching with automatic request deduplication, ideal for complex data needs.

### useAsyncList (Recommended)

For most async data loading scenarios, we recommend using `useAsyncList` from `@react-stately/data`.

This hook is specifically designed for handling async data in lists and provides built-in loading states, error handling, and filtering capabilities.

You can also prefetch initial options on component mount to ensure data is immediately available when users interact with the component.

Handle empty states when no data is available or search returns no results.

```tsx title="use-async-list"
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
```

`useAsyncList` handles the complexity of async data management automatically and integrates seamlessly with Marigold components. For more detailed examples and advanced usage, see our [useAsyncList documentation](/components/hooks-and-utils/useAsyncListData).

### React Query

React Query provides automatic caching, request deduplication, and built-in loading states for async data. Use when you need sophisticated caching strategies.

It also supports prefetching data on component mount or during user interactions.

```tsx title="react-query-basic"
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { useDeferredValue, useState } from 'react';
import { Autocomplete, Center } from '@marigold/components';

const useTickets = (searchTerm: string) => {
  return useQuery({
    queryKey: ['tickets', searchTerm],
    placeholderData: prev => prev,
    queryFn: async () => {
      try {
        const response = await fetch(
          `https://687680f7814c0dfa653c571a.mockapi.io/tickets?search=${searchTerm}`
        );
        const data = await response.json();
        if (typeof data === 'string') {
          throw new Error('Unexpected response format');
        }
        return data;
      } catch (error) {
        console.error('Error fetching tickets:', error);
        return [];
      }
    },
  });
};

const ReactQueryAutocomplete = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDeferredValue(searchTerm);
  const { data: items, isLoading } = useTickets(debouncedSearchTerm);
  return (
    <Autocomplete
      label="Search Tickets"
      items={items}
      value={searchTerm}
      onChange={setSearchTerm}
      allowsEmptyCollection
      emptyState={<Center>no tickets found</Center>}
      loading={isLoading}
    >
      {(item: any) => {
        return (
          <Autocomplete.Option
            key={item.id}
            textValue={`${item.name}`}
            id={item.id}
          >
            {item.name}
          </Autocomplete.Option>
        );
      }}
    </Autocomplete>
  );
};

const queryClient = new QueryClient();

export default function Example() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryAutocomplete />
    </QueryClientProvider>
  );
}
```

## Related

- [Combobox](../../components/form/combobox) - Learn more about Combobox component.

- [Autocomplete](../../components/form/autocomplete) - Learn more about Autocomplete component.
