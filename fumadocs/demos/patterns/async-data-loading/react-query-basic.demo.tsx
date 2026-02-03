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
