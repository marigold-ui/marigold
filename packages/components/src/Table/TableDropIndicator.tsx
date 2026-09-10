import type { CSSProperties } from 'react';
import { use } from 'react';
import {
  DragAndDropContext,
  DropIndicator,
} from 'react-aria-components/useDragAndDrop';
import type {
  DragAndDropOptions,
  DropIndicatorProps,
} from 'react-aria-components/useDragAndDrop';
import { cn, useClassNames } from '@marigold/system';

// Props
// ---------------
export interface TableDropIndicatorProps extends Pick<
  DropIndicatorProps,
  'target'
> {
  size?: string;
  variant?: string;
}

// Helper
// ---------------
/**
 * Nesting level of the row the drop is aimed at, so the indicator can start
 * where that level's values do. The drop target isn't rendered, so the level
 * has to come from the collection rather than the DOM — and the collection
 * counts from 0, unlike `aria-level`.
 */
const useDropLevel = ({ target }: Pick<DropIndicatorProps, 'target'>) => {
  const context = use(DragAndDropContext);

  if (target.type !== 'item') return undefined;

  return context?.dropState?.collection.getItem(target.key)?.level;
};

// Component
// ---------------
export const TableDropIndicator = ({
  size,
  variant,
  ...props
}: TableDropIndicatorProps) => {
  const classNames = useClassNames({
    component: 'Table',
    variant,
    size,
  });
  const level = useDropLevel(props);

  return (
    <DropIndicator
      {...props}
      style={
        level != null ? ({ '--drop-level': level } as CSSProperties) : undefined
      }
      className={cn(
        'transform-gpu',
        classNames.dropIndicator,
        'drop-target:before:z-10'
      )}
    />
  );
};

// Hook Handler
// ---------------
export const renderDropIndicator: DragAndDropOptions['renderDropIndicator'] =
  target => <TableDropIndicator target={target} />;
