import type RAC from 'react-aria-components';
import { Button, GridListItem } from 'react-aria-components';

import { cn } from '@marigold/system';

import { Checkbox } from '../Checkbox';
import { useGridListContext } from './Context';

export interface GridListItemProps
  extends Omit<RAC.GridListItemProps<object>, 'className' | 'style'> {}

const _GridListItem = ({ children, ...props }: GridListItemProps) => {
  let textValue = typeof children === 'string' ? children : undefined;
  const { classNames } = useGridListContext();
  console.log('classNames', classNames);
  return (
    <GridListItem
      textValue={textValue}
      {...props}
      className={cn('flex items-center', classNames?.option)}
    >
      {({ selectionMode, selectionBehavior, allowsDragging }) => (
        <>
          {/* Add elements for drag and drop and selection. */}
          {allowsDragging && <Button slot="drag">≡</Button>}
          {selectionMode === 'multiple' && selectionBehavior === 'toggle' && (
            <Checkbox slot="selection" />
          )}
          {children}
        </>
      )}
    </GridListItem>
  );
};

export { _GridListItem as GridListItem };
