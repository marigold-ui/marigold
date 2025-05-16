import { ReactNode, forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { GridListItem as SelectListItem } from 'react-aria-components';
import { SVGProps, cn } from '@marigold/system';
import { Checkbox } from '../Checkbox';
import { useSelectListContext } from './Context';

export interface SelectListItemProps
  extends Omit<RAC.GridListItemProps<object>, 'className' | 'style'> {
  children?: ReactNode;
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
  ({ children, ...props }, ref) => {
    let textValue = typeof children === 'string' ? children : undefined;

    const { classNames } = useSelectListContext();
    return (
      <SelectListItem
        textValue={textValue}
        {...props}
        className={cn('group-[layout=grid]/list:flex-row', classNames?.item)}
        ref={ref}
      >
        {({ selectionMode }) => (
          <>
            <SelectionIndicator selectionMode={selectionMode} />
            {children}
          </>
        )}
      </SelectListItem>
    );
  }
);

export { _SelectListItem as SelectListItem };
