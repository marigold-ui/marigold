import { ReactNode, forwardRef, useContext, useMemo } from 'react';
import type RAC from 'react-aria-components';
import {
  ButtonContext,
  Provider,
  GridListItem as RACGridListItem,
  TextContext,
} from 'react-aria-components';
import { cn } from '@marigold/system';
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
}

type TextContextValue = {
  slots?: Record<string, { className?: string } & Record<string, unknown>>;
};

interface OptionChildrenProps {
  children: ReactNode;
  labelClassName?: string;
  descriptionClassName?: string;
  actionClassName?: string;
}

// Merge (rather than replace) the RAC-provided slot configs on TextContext
// and ButtonContext so nested `<Text slot="label">`, `<Text slot="description">`,
// and nested `<IconButton>` / `<Button>` / `<ActionMenu>` pick up our theme
// classNames without losing RAC's aria-describedby wiring or existing
// explicit props.
const OptionChildren = ({
  children,
  labelClassName,
  descriptionClassName,
  actionClassName,
}: OptionChildrenProps) => {
  const parentText = useContext(TextContext) as TextContextValue | undefined;
  const parentSlots = parentText?.slots;

  const textContextValue = useMemo(
    () => ({
      slots: {
        ...parentSlots,
        label: { ...(parentSlots?.label ?? {}), className: labelClassName },
        description: {
          ...(parentSlots?.description ?? {}),
          className: descriptionClassName,
        },
      },
    }),
    [parentSlots, labelClassName, descriptionClassName]
  );

  return (
    <Provider
      values={[
        [TextContext, textContextValue],
        [ButtonContext, { className: actionClassName }],
      ]}
    >
      {children}
    </Provider>
  );
};

const _SelectListOption = forwardRef<HTMLDivElement, SelectListOptionProps>(
  ({ children, disabled, textValue, ...props }, ref) => {
    const { classNames, disabled: listDisabled } = useSelectListContext();
    const resolvedTextValue =
      textValue ?? (typeof children === 'string' ? children : undefined);

    if (
      process.env.NODE_ENV !== 'production' &&
      resolvedTextValue === undefined
    ) {
      // eslint-disable-next-line no-console
      console.warn(
        '[SelectList.Option] `textValue` is required when children is not a plain string. ' +
          'Screen readers announce the `textValue` as the option name.'
      );
    }

    return (
      <RACGridListItem
        isDisabled={disabled ?? listDisabled}
        textValue={resolvedTextValue}
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
  }
);

export { _SelectListOption as SelectListOption };
