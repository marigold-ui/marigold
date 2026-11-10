import { Copy, Trash2 } from 'lucide-react';
import { CommandPalette } from '@marigold/components';

export default () => (
  <CommandPalette shortcut={false}>
    <CommandPalette.Trigger />
    <CommandPalette.Content>
      <CommandPalette.Input placeholder="Search actions…" />
      <CommandPalette.List>
        <CommandPalette.Group title="Event">
          <CommandPalette.Item id="duplicate">
            <Copy />
            Duplicate event
          </CommandPalette.Item>
          <CommandPalette.Item id="delete" variant="destructive">
            <Trash2 />
            Delete event
          </CommandPalette.Item>
        </CommandPalette.Group>
        <CommandPalette.Group title="Restricted">
          <CommandPalette.Item id="fees" variant="master">
            Edit fees
          </CommandPalette.Item>
          <CommandPalette.Item id="impersonate" variant="admin">
            Impersonate user
          </CommandPalette.Item>
        </CommandPalette.Group>
      </CommandPalette.List>
    </CommandPalette.Content>
  </CommandPalette>
);
