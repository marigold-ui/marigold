import type { ReactNode, Ref } from 'react';
import { use, useMemo } from 'react';
import type RAC from 'react-aria-components';
import { ButtonContext } from 'react-aria-components/Button';
import { GridListItem as RACGridListItem } from 'react-aria-components/GridList';
import { TextContext } from 'react-aria-components/Text';
import { Provider } from 'react-aria-components/slots';
import { cn } from '@marigold/system';
import {
  type SlottedContextValue,
  useMergedTextSlots,
} from '../utils/useMergedTextSlots';
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

// Stable identity for the `parentButton` fallback so `buttonContextValue`'s
// `useMemo` isn't invalidated every render when no parent context is set.
const EMPTY_BUTTON_CTX: SlottedContextValue = {};

// Merge (rather than replace) RAC-provided slot configs on TextContext and
// ButtonContext so nested `<Text slot="label">`, `<Text slot="description">`
// and nested `<IconButton>` / `<Button>` / `<ActionMenu>` pick up our theme
// classNames without losing RAC's slot wiring or existing explicit props.
const OptionChildren = ({
  children,
  labelClassName,
  descriptionClassName,
  actionClassName,
}: OptionChildrenProps) => {
  const parentButton = use(ButtonContext) as SlottedContextValue | undefined;
  const parentButtonValue = parentButton ?? EMPTY_BUTTON_CTX;

  const textContextValue = useMergedTextSlots({
    label: labelClassName,
    description: descriptionClassName,
  });

  const buttonContextValue = useMemo(
    () => ({ ...parentButtonValue, className: actionClassName }),
    [parentButtonValue, actionClassName]
  );

  return (
    <Provider
      values={[
        [TextContext, textContextValue],
        [ButtonContext, buttonContextValue],
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
