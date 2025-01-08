import { ReactNode, forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { GridListItem as SelectListItem } from 'react-aria-components';
import { cn } from '@marigold/system';
import { Checkbox } from '../Checkbox';
import { useSelectListContext } from './Context';

export interface SelectListItemProps
  extends Omit<RAC.GridListItemProps<object>, 'className' | 'style'> {
  children?: ReactNode;
}

const _SelectListItem = forwardRef<HTMLDivElement, SelectListItemProps>(
  ({ children, ...props }, ref) => {
    let textValue = typeof children === 'string' ? children : undefined;

    const { classNames } = useSelectListContext();
    return (
      <SelectListItem
        textValue={textValue}
        {...props}
        className={cn(
          'items-center group-data-[layout=grid]/list:flex-row',
          classNames?.option
        )}
        ref={ref}
      >
        {({ selectionMode }) => (
          <>
            {selectionMode === 'multiple' && <Checkbox slot="selection" />}
            {children}
          </>
        )}
      </SelectListItem>
    );
  }
);

export { _SelectListItem as SelectListItem };
