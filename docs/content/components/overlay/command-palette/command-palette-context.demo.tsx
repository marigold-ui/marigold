import {
  CalendarDays,
  ChartColumn,
  Copy,
  Euro,
  ShoppingCart,
} from 'lucide-react';
import { CommandPalette, Keyboard, TextValue } from '@marigold/components';

// The person is on the page of the event "Jazz Night". Its actions come
// first, the global pages stay below in their usual place.
const eventActions = [
  { id: 'edit-prices', label: 'Edit prices', icon: <Euro />, shortcut: 'P' },
  {
    id: 'show-orders',
    label: 'Show orders',
    icon: <ShoppingCart />,
    shortcut: 'O',
  },
  { id: 'duplicate', label: 'Duplicate event', icon: <Copy />, shortcut: 'D' },
];

const pages = [
  { id: 'events', label: 'Events', icon: <CalendarDays /> },
  { id: 'orders', label: 'Orders', icon: <ShoppingCart /> },
  { id: 'reports', label: 'Reports', icon: <ChartColumn /> },
];

export default () => (
  <CommandPalette.Trigger shortcut={false}>
    <CommandPalette.Button />
    <CommandPalette placeholder="Search pages and actions…">
      <CommandPalette.Group title="Jazz Night">
        {eventActions.map(action => (
          <CommandPalette.Item
            key={action.id}
            id={action.id}
            textValue={action.label}
          >
            {action.icon}
            <TextValue>{action.label}</TextValue>
            <Keyboard>{action.shortcut}</Keyboard>
          </CommandPalette.Item>
        ))}
      </CommandPalette.Group>
      <CommandPalette.Group title="Pages">
        {pages.map(page => (
          <CommandPalette.Item key={page.id} id={page.id}>
            {page.icon}
            {page.label}
          </CommandPalette.Item>
        ))}
      </CommandPalette.Group>
    </CommandPalette>
  </CommandPalette.Trigger>
);
