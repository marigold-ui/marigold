import { useState } from 'react';
import { CommandPalette } from '@marigold/components';

const favourites = [
  { id: 'events', label: 'Events' },
  { id: 'orders', label: 'Orders' },
];

const pages = [
  { id: 'events', label: 'Events' },
  { id: 'orders', label: 'Orders' },
  { id: 'reports', label: 'Daily report' },
  { id: 'venues', label: 'Venues' },
  { id: 'vouchers', label: 'Vouchers' },
];

export default () => {
  const [query, setQuery] = useState('');
  const [title, items] =
    query === '' ? ['Favourites', favourites] : ['Pages', pages];

  return (
    <CommandPalette.Trigger shortcut={false}>
      <CommandPalette.Button />
      <CommandPalette inputValue={query} onInputChange={setQuery}>
        <CommandPalette.Group title={title}>
          {items.map(item => (
            <CommandPalette.Item key={item.id} id={item.id}>
              {item.label}
            </CommandPalette.Item>
          ))}
        </CommandPalette.Group>
      </CommandPalette>
    </CommandPalette.Trigger>
  );
};
