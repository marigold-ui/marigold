import { DropIndicator } from 'react-aria-components';
import type { DropIndicatorProps } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';

// Props
// ---------------
export interface TableViewDropIndicatorProps extends Pick<
  DropIndicatorProps,
  'target'
> {
  size?: string;
  variant?: string;
}

// Component
// ---------------
export const TableViewDropIndicator = ({
  size,
  variant,
  ...props
}: TableViewDropIndicatorProps) => {
  const classNames = useClassNames({
    component: 'TableView',
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
