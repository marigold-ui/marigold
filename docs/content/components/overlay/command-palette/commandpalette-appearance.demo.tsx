import { CalendarDays, Plus, ShoppingCart } from 'lucide-react';
import type { CommandPaletteProps } from '@marigold/components';
import { CommandPalette } from '@marigold/components';

export default (props: CommandPaletteProps) => (
  <CommandPalette shortcut={false} {...props}>
    <CommandPalette.Trigger />
    <CommandPalette.Content>
      <CommandPalette.Input placeholder="Search pages and actions…" />
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
        <CommandPalette.Group title="Actions">
          <CommandPalette.Item id="create-event">
            <Plus />
            Create event
          </CommandPalette.Item>
        </CommandPalette.Group>
      </CommandPalette.List>
    </CommandPalette.Content>
  </CommandPalette>
);
