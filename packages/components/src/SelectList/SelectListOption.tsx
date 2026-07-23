import type { ReactNode, Ref } from 'react';
import { useMemo } from 'react';
import type RAC from 'react-aria-components';
import { GridListItem as RACGridListItem } from 'react-aria-components/GridList';
import { TextContext } from 'react-aria-components/Text';
import { Provider } from 'react-aria-components/slots';
import { cn } from '@marigold/system';
import { ButtonContext as MarigoldButtonContext } from '../Button/Context';
import { useMergedTextSlots } from '../utils/useMergedTextSlots';
import { useSelectListContext } from './Context';
import { SelectionIndicator } from './SelectionIndicator';

type RemovedProps = 'className' | 'style' | 'isDisabled';

export interface SelectListOptionProps extends Omit<
  RAC.GridListItemProps<object>,
  RemovedProps
> {
  children?: ReactNode;
  /**
   * Whether the option is disabled.
   * @default false
   */
  disabled?: RAC.GridListItemProps<object>['isDisabled'];
  ref?: Ref<HTMLDivElement>;
}

interface OptionChildrenProps {
  children: ReactNode;
  labelClassName?: string;
  descriptionClassName?: string;
  actionClassName?: string;
}

// Inject the option's theme slot classNames: merge into RAC's TextContext (to keep aria wiring) and cascade the action slot class + `ghost` via Marigold's ButtonContext.
const OptionChildren = ({
  children,
  labelClassName,
  descriptionClassName,
  actionClassName,
}: OptionChildrenProps) => {
  const textContextValue = useMergedTextSlots({
    label: labelClassName,
    description: descriptionClassName,
  });

  // Marigold Button/LinkButton/ActionMenu read the Marigold ButtonContext, so the action slot className and the `ghost` default live here. A local `variant` still wins.
  const marigoldButtonContextValue = useMemo(
    () => ({ variant: 'ghost', className: actionClassName }),
    [actionClassName]
  );

  return (
    <Provider
      values={[
        [TextContext, textContextValue],
        [MarigoldButtonContext, marigoldButtonContextValue],
      ]}
    >
      {children}
    </Provider>
  );
};

export const SelectListOption = ({
  children,
  disabled,
  textValue,
  ref,
  ...props
}: SelectListOptionProps) => {
  const { classNames, disabled: listDisabled } = useSelectListContext();
  const resolvedTextValue =
    textValue ?? (typeof children === 'string' ? children : undefined);

  if (
    process.env.NODE_ENV !== 'production' &&
    resolvedTextValue === undefined
  ) {
    console.warn(
      `[SelectList.Option${props.id !== undefined ? ` id="${props.id}"` : ''}] ` +
        '`textValue` is required when children is not a plain string. ' +
        'Screen readers announce the `textValue` as the option name.'
    );
  }

  return (
    <RACGridListItem
      isDisabled={disabled ?? listDisabled}
      textValue={resolvedTextValue}
      {...props}
      className={cn(
        classNames?.item,
        'px-(--selectlist-item-px) py-(--selectlist-item-py)'
      )}
      ref={ref}
    >
      {({ selectionMode, isSelected, isDisabled }) => (
        <>
          <SelectionIndicator
            selectionMode={selectionMode as 'single' | 'multiple'}
            isSelected={isSelected}
            isDisabled={isDisabled}
            className={classNames?.indicator}
          />
          <OptionChildren
            labelClassName={classNames?.label}
            descriptionClassName={classNames?.description}
            actionClassName={classNames?.action}
          >
            {children}
          </OptionChildren>
        </>
      )}
    </RACGridListItem>
  );
};
