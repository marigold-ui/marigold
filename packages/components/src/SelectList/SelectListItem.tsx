import { Ref, forwardRef, useContext } from 'react';
import type RAC from 'react-aria-components';
import {
  Button,
  CheckboxContext,
  GridListItem as SelectListItem,
} from 'react-aria-components';

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
          {selectionMode === 'multiple' && selectionBehavior === 'toggle' && (
            <Checkbox slot="selection" />
          )}
          {selectionMode === 'single' && <RadioComp slot="selection" />}
          {children}
        </>
      )}
    </SelectListItem>
  );
});

const RadioComp = (props: any) => {
  const context = useContext(CheckboxContext);
  const isChecked = (context as any).slots.selection.isSelected;
  return <input type="radio" name="" id="" checked={isChecked} />;
};

export { _SelectListItem as SelectListItem };
