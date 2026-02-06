import { DropIndicator } from 'react-aria-components';
import type {
  DragAndDropOptions,
  DropIndicatorProps,
} from 'react-aria-components';
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
      className={cn('transform-gpu', classNames.dropIndicator)}
    />
  );
};

// Hook Handler
// ---------------
export const renderDropIndicator: DragAndDropOptions['renderDropIndicator'] =
  target => <TableDropIndicator target={target} />;
