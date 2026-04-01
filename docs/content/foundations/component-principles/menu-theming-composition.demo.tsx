import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Inline, Menu } from '@marigold/components';

export default () => (
  <Inline space="group" alignX="center">
    <Menu label="Actions" variant="default" size="default">
      <Menu.Section title="Event">
        <Menu.Item id="view">
          <Eye />
          View Details
        </Menu.Item>
        <Menu.Item id="edit">
          <Pencil />
          Edit Event
        </Menu.Item>
      </Menu.Section>
      <Menu.Section title="Danger Zone">
        <Menu.Item id="cancel" variant="destructive">
          <Trash2 />
          Cancel Event
        </Menu.Item>
      </Menu.Section>
    </Menu>
    <Menu label="Actions" variant="ghost" size="small">
      <Menu.Section title="Event">
        <Menu.Item id="view">
          <Eye />
          View Details
        </Menu.Item>
        <Menu.Item id="edit">
          <Pencil />
          Edit Event
        </Menu.Item>
      </Menu.Section>
      <Menu.Section title="Danger Zone">
        <Menu.Item id="cancel" variant="destructive">
          <Trash2 />
          Cancel Event
        </Menu.Item>
      </Menu.Section>
    </Menu>
  </Inline>
);
