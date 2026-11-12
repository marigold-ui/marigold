import type RAC from 'react-aria-components';
import { TableFooter as RACTableFooter } from 'react-aria-components/Table';
import { cn } from '@marigold/system';
import { useTableContext } from './Context';

// Props
// ---------------
type RemovedProps = 'className' | 'style';

export interface TableFooterProps<T extends object = object> extends Omit<
  RAC.TableFooterProps<T>,
  RemovedProps
> {
  /**
   * Makes the footer stick to the bottom of the viewport when scrolling.
   */
  sticky?: boolean;
}

// Component
// ---------------
const TableFooter = <T extends object>({
  sticky,
  ...props
}: TableFooterProps<T>) => {
  const { classNames } = useTableContext();

  return (
    <RACTableFooter
      className={cn(
        classNames.footer,
        // Above the sticky cells in the body, which pass under it.
        sticky && 'sticky bottom-0 z-10'
      )}
      {...props}
    />
  );
};

export { TableFooter };
