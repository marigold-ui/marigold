import {
  CalendarDays,
  ChartColumn,
  Download,
  MapPin,
  Plus,
  ShoppingCart,
} from 'lucide-react';
import { CommandPalette } from '@marigold/components';

export default () => (
  <CommandPalette shortcut={false}>
    <CommandPalette.Trigger />
    <CommandPalette.Content>
      <CommandPalette.Input placeholder="Search pages and actions…" />
      <CommandPalette.List onAction={key => alert(`Action: ${String(key)}`)}>
        <CommandPalette.Group title="Pages">
          <CommandPalette.Item id="events" href="#events">
            <CalendarDays />
            Events
          </CommandPalette.Item>
          <CommandPalette.Item id="orders" href="#orders">
            <ShoppingCart />
            Orders
          </CommandPalette.Item>
          <CommandPalette.Item id="reports" href="#reports">
            <ChartColumn />
            Reports
          </CommandPalette.Item>
          <CommandPalette.Item id="venues" href="#venues">
            <MapPin />
            Venues
          </CommandPalette.Item>
        </CommandPalette.Group>
        <CommandPalette.Group title="Actions">
          <CommandPalette.Item id="create-event">
            <Plus />
            Create event
          </CommandPalette.Item>
          <CommandPalette.Item id="export">
            <Download />
            Export sales
          </CommandPalette.Item>
        </CommandPalette.Group>
      </CommandPalette.List>
    </CommandPalette.Content>
  </CommandPalette>
);
