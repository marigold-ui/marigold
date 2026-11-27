import { CalendarDays, ShoppingCart } from 'lucide-react';
import { CommandPalette } from '@marigold/components';

export default () => (
  <CommandPalette.Trigger shortcut={false}>
    <CommandPalette.Button />
    <CommandPalette
      placeholder="Search pages…"
      emptyState="No page with that name. Try “events” or “orders”."
    >
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
    </CommandPalette>
  </CommandPalette.Trigger>
);
