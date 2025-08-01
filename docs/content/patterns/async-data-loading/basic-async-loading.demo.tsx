import { useEffect, useState, useTransition } from 'react';
import { Center, ComboBox } from '@marigold/components';

export default function () {
  const [searchQuery, setSearchQuery] = useState('');
  const [tickets, setTickets] = useState([]);

  const [isPending, setTransition] = useTransition();

  useEffect(() => {
    setTransition(async () => {
      try {
        const response = await fetch(
          `https://687680f7814c0dfa653c571a.mockapi.io/tickets/?search=${searchQuery}`
        );
        const data = await response.json();
        if (typeof data === 'string') {
          throw new Error('No Result');
        }
        setTickets(data);
      } catch (err) {
        console.error('Error fetching tickets:', err);
      }
    });
  }, [searchQuery]);

  return (
    <ComboBox
      value={searchQuery}
      onChange={setSearchQuery}
      defaultItems={tickets}
      allowsEmptyCollection
      emptyState={<Center>No Result Found</Center>}
      loading={isPending}
    >
      {item => <ComboBox.Option key={item.name}>{item.name}</ComboBox.Option>}
    </ComboBox>
  );
}
