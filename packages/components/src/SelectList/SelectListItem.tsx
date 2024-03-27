import { Ref, forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { Button, GridListItem as SelectListItem } from 'react-aria-components';

import { cn } from '@marigold/system';

import { Checkbox } from '../Checkbox';
import { useSelectListContext } from './Context';

export interface SelectListItemProps
  extends Omit<RAC.GridListItemProps<object>, 'className' | 'style'> {}

const _SelectListItem = forwardRef<
  HTMLDivElement | undefined,
  SelectListItemProps
>(({ children, ...props }, ref) => {
  let textValue = typeof children === 'string' ? children : undefined;
  const { classNames } = useSelectListContext();
  return (
    <SelectListItem
      textValue={textValue}
      {...props}
      className={cn('flex items-center', classNames?.option)}
      ref={ref as Ref<HTMLDivElement>}
    >
      {({ selectionMode, selectionBehavior, allowsDragging }) => (
        <>
          {/* Add elements for drag and drop and selection. */}
          {allowsDragging && <Button slot="drag">≡</Button>}
          {selectionMode === 'multiple' && <Checkbox slot="selection" />}
          {children}
        </>
      )}
    </SelectListItem>
  );
});

export { _SelectListItem as SelectListItem };
