import type { DragAndDropOptions } from 'react-aria-components';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { cn, useClassNames } from '@marigold/system';
import { intlMessages } from '../intl/messages';

// Props
// ---------------
export interface TableViewDragPreviewProps {
  variant?: string;
  size?: string;
  /* Dragged items */
  items: Record<string, string>[];
}

// Component
// ---------------
export const TableViewDragPreview = ({
  items,
  variant,
  size,
}: TableViewDragPreviewProps) => {
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  const classNames = useClassNames({
    component: 'TableView',
    variant,
    size,
  });

  return (
    <div
      className={cn(
        'flex transform-gpu items-center gap-2',
        classNames.dragPreview
      )}
    >
      {items[0]['text/plain'] ?? stringFormatter.format('items')}
      <div className={classNames.dragPreviewCounter}>{items.length}</div>
    </div>
  );
};

// Hook Handler
// ---------------
export const renderDragPreview: DragAndDropOptions['renderDragPreview'] =
  items => {
    if (items.length > 1) return <TableViewDragPreview items={items} />;

    // For single items we use the default preview, types are not correct here.
    // "undefined" will make react-aria use its default rendering.
    return undefined as any;
  };
