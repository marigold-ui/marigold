import { Button, Menu, OverflowRegion } from '@marigold/components';
import { Archive, Copy, Pencil, Share2, Trash2 } from '@marigold/icons';
import { DemoResizer } from '@/ui/DemoResizer';

const actions = [
  { id: 'edit', label: 'Edit', icon: <Pencil /> },
  { id: 'duplicate', label: 'Duplicate', icon: <Copy /> },
  { id: 'share', label: 'Share', icon: <Share2 /> },
  { id: 'archive', label: 'Archive', icon: <Archive /> },
  { id: 'delete', label: 'Delete', icon: <Trash2 /> },
];

// A toolbar that collapses instead of wrapping: actions that no longer
// fit move into the "More" menu. Priority is DOM order, so
// `actions.slice(visibleCount)` is exactly the hidden set.
export default () => (
  <DemoResizer defaultWidth={440} minWidth={220}>
    <OverflowRegion
      indicator={({ visibleCount }) => (
        <Menu label="More" aria-label="More actions">
          {actions.slice(visibleCount).map(action => (
            <Menu.Item key={action.id} id={action.id}>
              {action.icon} {action.label}
            </Menu.Item>
          ))}
        </Menu>
      )}
    >
      {actions.map(action => (
        <Button key={action.id} variant="ghost">
          {action.icon} {action.label}
        </Button>
      ))}
    </OverflowRegion>
  </DemoResizer>
);
