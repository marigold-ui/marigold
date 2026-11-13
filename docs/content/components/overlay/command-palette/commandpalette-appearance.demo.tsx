import {
  CalendarDays,
  ChartColumn,
  MapPin,
  Plus,
  Settings,
  ShoppingCart,
  Ticket,
  Users,
} from 'lucide-react';
import { CommandPalette, Description, TextValue } from '@marigold/components';

const pages = [
  { id: 'events', label: 'Events', icon: <CalendarDays /> },
  { id: 'orders', label: 'Orders', icon: <ShoppingCart /> },
  { id: 'reports', label: 'Reports', icon: <ChartColumn /> },
  { id: 'venues', label: 'Venues', icon: <MapPin /> },
  { id: 'customers', label: 'Customers', icon: <Users /> },
  { id: 'settings', label: 'Settings', icon: <Settings /> },
];

const actions = [
  { id: 'create-event', label: 'Create event' },
  { id: 'add-venue', label: 'Add venue' },
  { id: 'invite-customer', label: 'Invite customer' },
];

const events = [
  { id: 'event-1', number: 1, name: 'Jazz Night', date: '12 Aug' },
  { id: 'event-13', number: 13, name: 'Jazz Matinee', date: '6 Sep' },
  { id: 'event-16', number: 16, name: 'Comedy Slam', date: '13 Sep' },
];

export default () => (
  <CommandPalette.Trigger shortcut={false}>
    <CommandPalette.Button />
    <CommandPalette placeholder="Search pages, actions and events…">
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
          <CommandPalette.Item
            key={event.id}
            id={event.id}
            textValue={`${event.name} ${event.number}`}
          >
            <Ticket />
            <TextValue>{event.name}</TextValue>
            <Description>
              #{event.number}, {event.date}
            </Description>
          </CommandPalette.Item>
        ))}
      </CommandPalette.Group>
    </CommandPalette>
  </CommandPalette.Trigger>
);
