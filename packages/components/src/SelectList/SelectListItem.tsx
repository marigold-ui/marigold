import type { ReactNode } from 'react';
import { forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { GridListItem as RACGridListItem } from 'react-aria-components';
import type { SVGProps } from '@marigold/system';
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
  /**
   * Whether to render as a card layout.
   * @default false
   */
  variant?: 'simple' | 'card';
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
  variant?: 'simple' | 'card';
}

const SelectionIndicator = ({
  selectionMode,
  isSelected,
  variant = 'simple',
}: SelectionIndicatorProps) => {
  switch (selectionMode) {
    case 'multiple': {
      return <Checkbox slot="selection" />;
    }
    case 'single': {
      return variant === 'card' ? (
        <RadioIndicator isSelected={isSelected} />
      ) : (
        <CheckMark className="invisible hidden" />
      );
    }
  }
};

const _SelectListItem = forwardRef<HTMLDivElement, SelectListItemProps>(
  ({ children, disabled, variant = 'simple', ...props }, ref) => {
    let textValue = typeof children === 'string' ? children : undefined;

    const { classNames } = useSelectListContext();

    if (variant === 'card') {
      return (
        <RACGridListItem
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
                    variant="card"
                  />
                </div>
              </div>
            </Card>
          )}
        </RACGridListItem>
      );
    }

    return (
      <RACGridListItem
        isDisabled={disabled}
        textValue={textValue}
        {...props}
        className={cn(
          classNames?.item,
          'grid grid-flow-col [grid-template-columns:min-content_1fr]'
        )}
        ref={ref}
      >
        {({ selectionMode, isSelected }) => (
          <div className="selection-indicator contents">
            <SelectionIndicator
              selectionMode={selectionMode}
              isSelected={isSelected}
              variant="simple"
            />
            {children}
          </div>
        )}
      </RACGridListItem>
    );
  }
);

export { _SelectListItem as SelectListItem };
