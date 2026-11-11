import { CalendarDays, ShoppingCart, Ticket } from 'lucide-react';
import { useState } from 'react';
import { CommandPalette, Text } from '@marigold/components';

// Stands in for a request to your API.
const events = [
  { id: '1024', name: 'Jazz im Park', date: 'Jun 14, 2026' },
  { id: '1031', name: 'Stadtfest', date: 'Jul 2, 2026' },
  { id: '2048', name: 'Open-Air Kino', date: 'Aug 21, 2026' },
];

const PREFIX = 'e:';

export default () => {
  const [query, setQuery] = useState('');
  const lookup = query.toLowerCase().startsWith(PREFIX);
  const id = query.slice(PREFIX.length).trim();
  const matches = lookup && id ? events.filter(e => e.id.startsWith(id)) : [];

  return (
    <CommandPalette.Trigger shortcut={false}>
      <CommandPalette.Button />
      <CommandPalette
        placeholder="Search pages, or e:1024 for an event…"
        inputValue={query}
        onInputChange={setQuery}
        // The prefix query is not a label, so the built-in filter is off for it.
        filter={lookup ? false : undefined}
        emptyState={
          lookup
            ? id
              ? `No event with a number starting with ${id}.`
              : 'Type an event number, for example e:1024.'
            : undefined
        }
      >
        {lookup ? (
          // An empty group would still count as content, so it only
          // renders with matches and the empty state shows otherwise.
          matches.length > 0 && (
            <CommandPalette.Group title="Events">
              {matches.map(event => (
                <CommandPalette.Item
                  key={event.id}
                  id={event.id}
                  href={`#event-${event.id}`}
                  textValue={event.name}
                >
                  <Ticket />
                  <Text slot="label">{event.name}</Text>
                  <Text slot="description">
                    #{event.id}, {event.date}
                  </Text>
                </CommandPalette.Item>
              ))}
            </CommandPalette.Group>
          )
        ) : (
          <CommandPalette.Group title="Pages">
            <CommandPalette.Item id="events" href="#events">
              <CalendarDays />
              Events
            </CommandPalette.Item>
            <CommandPalette.Item id="orders" href="#orders">
              <ShoppingCart />
              Orders
            </CommandPalette.Item>
          </CommandPalette.Group>
        )}
      </CommandPalette>
    </CommandPalette.Trigger>
  );
};
