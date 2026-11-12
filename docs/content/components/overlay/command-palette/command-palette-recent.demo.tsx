import { CalendarDays, Plus, ShoppingCart, Ticket } from 'lucide-react';
import { useState } from 'react';
import { CommandPalette, Text } from '@marigold/components';

const pages = [
  { id: 'events', label: 'Events', icon: <CalendarDays /> },
  { id: 'orders', label: 'Orders', icon: <ShoppingCart /> },
];

const actions = [{ id: 'create-event', label: 'Create event' }];

const events = [
  { id: 'event-1', number: 1, name: 'Jazz Night', date: '12 Aug' },
  { id: 'event-13', number: 13, name: 'Jazz Matinee', date: '6 Sep' },
  { id: 'event-16', number: 16, name: 'Comedy Slam', date: '13 Sep' },
  { id: 'event-6', number: 6, name: 'Poetry Slam', date: '21 Aug' },
];

// In a real app, the server keeps each person's favourites and what they
// opened last. A favourite doesn't show again under Recent.
const favourites = [events[0]];
const recent = [events[2], events[3]];

const EventItem = ({ event }: { event: (typeof events)[number] }) => (
  <CommandPalette.Item
    id={event.id}
    textValue={`${event.name} ${event.number}`}
  >
    <Ticket />
    <Text slot="label">{event.name}</Text>
    <Text slot="description">
      #{event.number}, {event.date}
    </Text>
  </CommandPalette.Item>
);

export default () => {
  const [query, setQuery] = useState('');

  return (
    <CommandPalette.Trigger shortcut={false}>
      <CommandPalette.Button />
      <CommandPalette
        placeholder="Search pages, actions and events…"
        inputValue={query}
        onInputChange={setQuery}
      >
        {query === '' ? (
          <>
            <CommandPalette.Group title="Favourites">
              <CommandPalette.Item id="orders">
                <ShoppingCart />
                Orders
              </CommandPalette.Item>
              {favourites.map(event => (
                <EventItem key={event.id} event={event} />
              ))}
            </CommandPalette.Group>
            <CommandPalette.Group title="Recent">
              {recent.map(event => (
                <EventItem key={event.id} event={event} />
              ))}
            </CommandPalette.Group>
            <CommandPalette.Group title="Actions">
              {actions.map(action => (
                <CommandPalette.Item key={action.id} id={action.id}>
                  <Plus />
                  {action.label}
                </CommandPalette.Item>
              ))}
            </CommandPalette.Group>
          </>
        ) : (
          <>
            <CommandPalette.Group title="Pages">
              {pages.map(page => (
                <CommandPalette.Item key={page.id} id={page.id}>
                  {page.icon}
                  {page.label}
                </CommandPalette.Item>
              ))}
            </CommandPalette.Group>
            <CommandPalette.Group title="Actions">
              {actions.map(action => (
                <CommandPalette.Item key={action.id} id={action.id}>
                  <Plus />
                  {action.label}
                </CommandPalette.Item>
              ))}
            </CommandPalette.Group>
            <CommandPalette.Group title="Events">
              {events.map(event => (
                <EventItem key={event.id} event={event} />
              ))}
            </CommandPalette.Group>
          </>
        )}
      </CommandPalette>
    </CommandPalette.Trigger>
  );
};
