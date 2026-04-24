import { ReactNode, forwardRef, useContext } from 'react';
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

const ItemChildren = ({ children }: { children: ReactNode }) => {
  // RAC GridListItem registers a TextContext that only allows the
  // `description` slot. Merge it with a `label` slot so consumers can mirror
  // the Select/ComboBox convention of <Text slot="label"> / <Text slot="description">.
  const parentContext = useContext(TextContext) as
    | { slots?: Record<string, unknown> }
    | undefined;
  const parentSlots = parentContext?.slots ?? {};

  return (
    <Provider
      values={[
        [
          TextContext,
          {
            slots: {
              ...parentSlots,
              label: {},
            },
          },
        ],
      ]}
    >
      {children}
    </Provider>
  );
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
