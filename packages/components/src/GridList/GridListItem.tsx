import { Ref, forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { Button, GridListItem } from 'react-aria-components';

import { cn } from '@marigold/system';

import { Checkbox } from '../Checkbox';
import { useGridListContext } from './Context';

export interface GridListItemProps
  extends Omit<RAC.GridListItemProps<object>, 'className' | 'style'> {}

const _GridListItem = forwardRef<HTMLDivElement | undefined, GridListItemProps>(
  ({ children, ...props }, ref) => {
    let textValue = typeof children === 'string' ? children : undefined;
    const { classNames } = useGridListContext();
    return (
      <GridListItem
        textValue={textValue}
        {...props}
        className={cn('flex items-center', classNames?.option)}
        ref={ref as Ref<HTMLDivElement>}
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
  }
);

export { _GridListItem as GridListItem };
