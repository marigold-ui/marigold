import { ReactNode, forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { GridListItem as SelectListItem } from 'react-aria-components';
import { SVGProps, cn } from '@marigold/system';
import { Checkbox } from '../Checkbox/Checkbox';
import { useSelectListContext } from './Context';

type RemovedProps = 'className' | 'style' | 'isDisabled';

export interface SelectListItemProps
  extends Omit<RAC.GridListItemProps<object>, RemovedProps> {
  children?: ReactNode;
  /**
   * Whether the item is disabled.
   * @default false
   */
  disabled?: RAC.GridListItemProps<object>['isDisabled'];
}

const CheckMark = ({ className }: SVGProps) => (
  <svg width="12px" height="10px" viewBox="0 0 12 10" className={className}>
    <path
      fill="currentColor"
      stroke="none"
      d="M11.915 1.548 10.367 0 4.045 6.315 1.557 3.827 0 5.373l4.045 4.046 7.87-7.871Z"
    />
  </svg>
);

interface SelectionIndicatorProps {
  selectionMode: 'single' | 'multiple' | 'none';
}

const SelectionIndicator = ({ selectionMode }: SelectionIndicatorProps) => {
  switch (selectionMode) {
    case 'multiple': {
      return <Checkbox slot="selection" />;
    }
    case 'single': {
      return <CheckMark className="invisible hidden" />;
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
