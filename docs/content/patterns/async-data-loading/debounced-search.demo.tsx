import { useEffect, useState } from 'react';
import { Autocomplete, Center } from '@marigold/components';

export default function () {
  const [searchQuery, setSearchQuery] = useState('');
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://687680f7814c0dfa653c571a.mockapi.io/tickets/?search=${searchQuery}`
        );
        const data = await response.json();
        if (typeof data === 'string') {
          setTickets([]);
          throw new Error('No Result');
        }
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <Autocomplete
      value={searchQuery}
      onChange={setSearchQuery}
      items={tickets}
      emptyState={<Center>No results found</Center>}
      allowsEmptyCollection
    >
      {(item: any) => (
        <Autocomplete.Option key={item.name}>{item.name}</Autocomplete.Option>
      )}
    </Autocomplete>
  );
}
