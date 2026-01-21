import { ReactNode, forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { GridListItem as SelectListItem } from 'react-aria-components';
import { cn } from '@marigold/system';
import { Checkbox } from '../Checkbox/Checkbox';
import { Check } from '../icons/Check';
import { useSelectListContext } from './Context';

type RemovedProps = 'className' | 'style' | 'isDisabled';

export interface SelectListItemProps extends Omit<
  RAC.GridListItemProps<object>,
  RemovedProps
> {
  children?: ReactNode;
  /**
   * Whether the item is disabled.
   * @default false
   */
  disabled?: RAC.GridListItemProps<object>['isDisabled'];
}

interface SelectionIndicatorProps {
  selectionMode: 'single' | 'multiple' | 'none';
}

const SelectionIndicator = ({ selectionMode }: SelectionIndicatorProps) => {
  switch (selectionMode) {
    case 'multiple': {
      return <Checkbox slot="selection" />;
    }
    case 'single': {
      return <Check size={12} className="invisible hidden" />;
    }
  }
};

const _SelectListItem = forwardRef<HTMLDivElement, SelectListItemProps>(
  ({ children, disabled, ...props }, ref) => {
    let textValue = typeof children === 'string' ? children : undefined;

    const { classNames } = useSelectListContext();
    return (
      <SelectListItem
        isDisabled={disabled}
        textValue={textValue}
        {...props}
        className={cn(
          classNames?.item,
          'grid grid-flow-col [grid-template-columns:min-content_1fr]'
        )}
        ref={ref}
      >
        {({ selectionMode }) => (
          <div className="selection-indicator contents">
            <SelectionIndicator selectionMode={selectionMode} />
            {children}
          </div>
        )}
      </SelectListItem>
    );
  }
);

export { _SelectListItem as SelectListItem };
