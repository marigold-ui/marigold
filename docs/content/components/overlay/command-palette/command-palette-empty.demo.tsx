import { CalendarDays, ShoppingCart } from 'lucide-react';
import { CommandPalette } from '@marigold/components';

export default () => (
  <CommandPalette shortcut={false}>
    <CommandPalette.Trigger />
    <CommandPalette.Content>
      <CommandPalette.Input placeholder="Search pages…" />
      <CommandPalette.List>
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
      </CommandPalette.List>
      <CommandPalette.Empty>
        No page with that name. Try “events” or “orders”.
      </CommandPalette.Empty>
    </CommandPalette.Content>
  </CommandPalette>
);
