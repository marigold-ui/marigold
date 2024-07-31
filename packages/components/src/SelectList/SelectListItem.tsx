import { Ref, forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { GridListItem as SelectListItem } from 'react-aria-components';

import { cn } from '@marigold/system';

import { Checkbox } from '../Checkbox';
import { FieldGroup } from '../FieldBase';
import { useSelectListContext } from './Context';

export interface SelectListItemProps
  extends Omit<RAC.GridListItemProps<object>, 'className' | 'style'> {}

const _SelectListItem = forwardRef<HTMLDivElement, SelectListItemProps>(
  ({ children, ...props }, ref) => {
    let textValue = typeof children === 'string' ? children : undefined;
    const { classNames } = useSelectListContext();
    return (
      <SelectListItem
        textValue={textValue}
        {...props}
        className={cn('flex items-center', classNames?.option)}
        ref={ref as Ref<HTMLDivElement>}
      >
        {({ selectionMode }) => (
          <>
            {selectionMode === 'multiple' && (
              <FieldGroup>
                <Checkbox slot="selection" />
              </FieldGroup>
            )}
            {children}
          </>
        )}
      </SelectListItem>
    );
  }
);

export { _SelectListItem as SelectListItem };
