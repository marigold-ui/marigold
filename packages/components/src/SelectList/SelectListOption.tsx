import type { ReactNode, Ref } from 'react';
import { use, useMemo } from 'react';
import type RAC from 'react-aria-components';
import { ButtonContext } from 'react-aria-components/Button';
import { GridListItem as RACGridListItem } from 'react-aria-components/GridList';
import { TextContext } from 'react-aria-components/Text';
import { Provider } from 'react-aria-components/slots';
import { cn } from '@marigold/system';
import { ButtonContext as MarigoldButtonContext } from '../Button/Context';
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

type SlottedContextValue = {
  slots?: Record<string, { className?: string } & Record<string, unknown>>;
};

interface OptionChildrenProps {
  children: ReactNode;
  labelClassName?: string;
  descriptionClassName?: string;
  actionClassName?: string;
}

// Stable identity so `buttonContextValue`'s `useMemo` isn't invalidated each
// render when there's no parent context.
const EMPTY_BUTTON_CTX: SlottedContextValue = {};

// A trailing action in an option is low-emphasis chrome, so a nested Marigold
// `<Button>`/`<LinkButton>`/`<ActionMenu>` defaults to `ghost` (a local
// `variant` still wins).
const OPTION_BUTTON_CASCADE = { variant: 'ghost' };

// Merge (not replace) RAC's slot configs on Text/Button contexts so nested
// slotted children pick up our theme classNames without losing RAC's wiring.
const OptionChildren = ({
  children,
  labelClassName,
  descriptionClassName,
  actionClassName,
}: OptionChildrenProps) => {
  const parentText = use(TextContext) as SlottedContextValue | undefined;
  const parentButton = use(ButtonContext) as SlottedContextValue | undefined;
  const parentTextSlots = parentText?.slots;
  const parentButtonValue = parentButton ?? EMPTY_BUTTON_CTX;

  const textContextValue = useMemo(
    () => ({
      slots: {
        ...parentTextSlots,
        label: {
          ...(parentTextSlots?.label ?? {}),
          className: labelClassName,
        },
        description: {
          ...(parentTextSlots?.description ?? {}),
          className: descriptionClassName,
        },
      },
    }),
    [parentTextSlots, labelClassName, descriptionClassName]
  );

  const buttonContextValue = useMemo(
    () => ({ ...parentButtonValue, className: actionClassName }),
    [parentButtonValue, actionClassName]
  );

  return (
    <Provider
      values={[
        [TextContext, textContextValue],
        [ButtonContext, buttonContextValue],
        [MarigoldButtonContext, OPTION_BUTTON_CASCADE],
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
