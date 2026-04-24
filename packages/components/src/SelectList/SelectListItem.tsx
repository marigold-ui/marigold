import { ReactNode, forwardRef, useContext, useMemo } from 'react';
import type RAC from 'react-aria-components';
import {
  Provider,
  GridListItem as SelectListItem,
  TextContext,
} from 'react-aria-components';
import { cn } from '@marigold/system';
import { useSelectListContext } from './Context';
import { SelectionIndicator } from './SelectionIndicator';

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

// RAC GridListItem registers a TextContext that only allows the `description`
// slot. We merge a `label` slot so consumers can mirror the Select/ComboBox
// convention of <Text slot="label"> / <Text slot="description">.
const LABEL_SLOT = {};

const ItemChildren = ({ children }: { children: ReactNode }) => {
  const parentContext = useContext(TextContext) as
    | { slots?: Record<string, unknown> }
    | undefined;
  const parentSlots = parentContext?.slots;

  const value = useMemo(
    () => ({ slots: { ...parentSlots, label: LABEL_SLOT } }),
    [parentSlots]
  );

  return <Provider values={[[TextContext, value]]}>{children}</Provider>;
};

const _SelectListItem = forwardRef<HTMLDivElement, SelectListItemProps>(
  ({ children, disabled, ...props }, ref) => {
    const textValue = typeof children === 'string' ? children : undefined;
    const { classNames, disabled: listDisabled } = useSelectListContext();

    return (
      <SelectListItem
        isDisabled={disabled ?? listDisabled}
        textValue={textValue}
        {...props}
        className={cn(classNames?.item)}
        ref={ref}
      >
        {({ selectionMode, isSelected, isDisabled }) => (
          <>
            <SelectionIndicator
              selectionMode={selectionMode}
              isSelected={isSelected}
              isDisabled={isDisabled}
              className={classNames?.indicator}
            />
            <ItemChildren>{children}</ItemChildren>
          </>
        )}
      </SelectListItem>
    );
  }
);

export { _SelectListItem as SelectListItem };
