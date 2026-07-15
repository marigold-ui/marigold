import { DropIndicator } from 'react-aria-components/useDragAndDrop';
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
  return (
    <DropIndicator
      {...props}
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
