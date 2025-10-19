import type { ReactNode } from 'react';
import { forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { GridListItem as SelectListItem } from 'react-aria-components';
import { cn } from '@marigold/system';
import { Card } from '../Card/Card';
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

const RadioIndicator = ({ isSelected }: { isSelected: boolean }) => (
  <div
    className="flex h-4 w-4 items-center justify-center rounded-[50%] border p-1"
    aria-hidden="true"
  >
    {isSelected && (
      <svg viewBox="0 0 6 6">
        <circle fill="currentColor" cx="3" cy="3" r="3" />
      </svg>
    )}
  </div>
);

interface SelectionIndicatorProps {
  selectionMode: 'single' | 'multiple' | 'none';
  isSelected: boolean;
}

const SelectionIndicator = ({
  selectionMode,
  isSelected,
}: SelectionIndicatorProps) => {
  switch (selectionMode) {
    case 'multiple': {
      return <Checkbox slot="selection" />;
    }
    case 'single': {
      return <RadioIndicator isSelected={isSelected} />;
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
        className={cn(classNames?.item, 'flex w-full')}
        ref={ref}
      >
        {({ selectionMode, isSelected }) => (
          <Card size="full">
            <div className="grid grid-cols-[auto_1fr] items-start gap-4">
              {children}
              <div className="col-start-2 row-start-1 self-center justify-self-end">
                <SelectionIndicator
                  selectionMode={selectionMode}
                  isSelected={isSelected}
                />
              </div>
            </div>
          </Card>
        )}
      </SelectListItem>
    );
  }
);

export { _SelectListItem as SelectListItem };
