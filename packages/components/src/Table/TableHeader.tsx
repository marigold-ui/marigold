import type RAC from 'react-aria-components';
import {
  Collection,
  Column,
  TableHeader as RACTableHeader,
  useTableOptions,
} from 'react-aria-components';
import { cn } from '@marigold/system';
import { Checkbox } from '../Checkbox/Checkbox';
import { useTableContext } from './Context';

// Props
// ---------------
type RemovedProps = 'className' | 'style';

export interface TableHeaderProps<T extends object = object> extends Omit<
  RAC.TableHeaderProps<T>,
  RemovedProps
> {
  /**
   * Makes the header stick to the top of the viewport when scrolling.
   */
  sticky?: boolean;
}

// Component
// ---------------
const TableHeader = <T extends object>({
  sticky,
  columns,
  children,
  ...props
}: TableHeaderProps<T>) => {
  const { selectionBehavior, selectionMode, allowsDragging } =
    useTableOptions();
  const { classNames } = useTableContext();

  return (
    <RACTableHeader
      className={cn(classNames.head, sticky && 'sticky top-0')}
      {...props}
    >
      {allowsDragging && (
        <Column className={classNames.column} minWidth={24} width={24} />
      )}
      {selectionBehavior === 'toggle' && (
        <Column minWidth={36} width={36} className={classNames.column}>
          {selectionMode === 'multiple' && <Checkbox slot="selection" />}
        </Column>
      )}
      <Collection items={columns}>{children}</Collection>
    </RACTableHeader>
  );
};

export { TableHeader };
