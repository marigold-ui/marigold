import type { ReactNode, Ref, RefObject } from 'react';
import { use, useEffect, useMemo } from 'react';
import type RAC from 'react-aria-components';
import { GridListItem as RACGridListItem } from 'react-aria-components/GridList';
import { HeadingContext } from 'react-aria-components/Heading';
import { TextContext } from 'react-aria-components/Text';
import { Provider } from 'react-aria-components/slots';
import { useObjectRef } from '@react-aria/utils';
import { ButtonContext as MarigoldButtonContext } from '../Button/Context';
import { TextValue } from '../TextValue/TextValue';
import { GridSelectionIndicator } from '../utils/GridSelectionIndicator';
import type { SlottedContextValue } from '../utils/useMergedTextSlots';
import { useListViewContext } from './Context';

// Children claim their cell via slot contexts (label/title/description on
// Text/Heading, actions via ButtonContext); the indicator is component-owned.
// Unclaimed content is auto-placed, so the trailing cell is Button-only (DST-1681).

type RemovedProps = 'className' | 'style' | 'isDisabled';

export interface ListViewItemProps extends Omit<
  RAC.GridListItemProps<object>,
  RemovedProps
> {
  children?: ReactNode;
  /**
   * Whether the row is disabled.
   * @default false
   */
  disabled?: RAC.GridListItemProps<object>['isDisabled'];
  ref?: Ref<HTMLDivElement>;
}

interface ItemChildrenProps {
  children: ReactNode;
  row: RefObject<HTMLElement | null>;
  labelClassName?: string;
  descriptionClassName?: string;
  titleClassName?: string;
  actionsClassName?: string;
}

// Two Button-family children both claim the actions cell and stack, and the
// types can't forbid it, so warn once at authoring time. The hook has to run
// inside `ItemChildren`: RAC renders a static collection twice and only the
// second pass is inside the row, so `row.current` is null one level up.
let hasWarnedStackedActions = false;

// Test-only: lets each test assert the warning without racing another file.
export const __resetStackedActionsWarning = () => {
  hasWarnedStackedActions = false;
};

const useStackedActionsWarning = (row: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' || hasWarnedStackedActions) {
      return;
    }

    // Counts what the context reached: a `<ButtonGroup>` re-provides a fresh
    // one, so its buttons carry no attribute and a grouped row stays at one.
    const claimed = row.current?.querySelectorAll('[data-grid-area="actions"]');

    if (claimed && claimed.length > 1) {
      hasWarnedStackedActions = true;
      console.warn(
        'Marigold: a `<ListView.Item>` has more than one trailing control. ' +
          'They all claim the row’s actions cell and stack on top of each ' +
          'other — wrap them in a `<ButtonGroup>`.'
      );
    }
  });
};

// Merge rather than replace RAC's slot configs, so nested slotted children keep
// its wiring. `title` forces `as: 'span'`: a list must not emit one document
// heading per row.
const ItemChildren = ({
  children,
  row,
  labelClassName,
  descriptionClassName,
  titleClassName,
  actionsClassName,
}: ItemChildrenProps) => {
  useStackedActionsWarning(row);

  const parentTextSlots = (use(TextContext) as SlottedContextValue | undefined)
    ?.slots;
  const parentHeadingSlots = (
    use(HeadingContext) as SlottedContextValue | undefined
  )?.slots;

  const textContextValue = useMemo(
    () => ({
      slots: {
        ...parentTextSlots,
        label: {
          ...(parentTextSlots?.label ?? {}),
          className: labelClassName,
          'data-grid-area': 'label',
        },
        description: {
          ...(parentTextSlots?.description ?? {}),
          className: descriptionClassName,
          'data-grid-area': 'description',
        },
      },
    }),
    [parentTextSlots, labelClassName, descriptionClassName]
  );

  const headingContextValue = useMemo(
    () => ({
      slots: {
        ...parentHeadingSlots,
        title: {
          ...(parentHeadingSlots?.title ?? {}),
          as: 'span',
          className: titleClassName,
          // `label`, not `title`: `<Title>` is the other way to author the
          // row's primary text and lands in the same cell.
          'data-grid-area': 'label',
        },
      },
    }),
    [parentHeadingSlots, titleClassName]
  );

  // Carries the actions cell and the `ghost` default to whichever Button-family
  // control the row has; a local `variant` wins, and `<ButtonGroup>` re-provides.
  const buttonContextValue = useMemo(
    () => ({
      className: actionsClassName,
      'data-grid-area': 'actions',
      variant: 'ghost',
    }),
    [actionsClassName]
  );

  return (
    <Provider
      values={[
        [TextContext, textContextValue],
        [HeadingContext, headingContextValue],
        [MarigoldButtonContext, buttonContextValue],
      ]}
    >
      {children}
    </Provider>
  );
};

export const ListViewItem = ({
  children,
  disabled,
  textValue,
  ref,
  ...props
}: ListViewItemProps) => {
  const { classNames } = useListViewContext();
  const rowRef = useObjectRef(ref);
  // No warning of our own: RAC's `GridList` already warns on a missing
  // `textValue`, and its warning can't be suppressed.
  const resolvedTextValue =
    textValue ?? (typeof children === 'string' ? children : undefined);

  return (
    <RACGridListItem
      isDisabled={disabled}
      textValue={resolvedTextValue}
      {...props}
      className={classNames?.item}
      ref={rowRef}
    >
      {({ selectionMode, isSelected, isDisabled }) => (
        <>
          <GridSelectionIndicator
            selectionMode={selectionMode}
            isSelected={isSelected}
            isDisabled={isDisabled}
            className={classNames?.indicator}
          />
          <ItemChildren
            row={rowRef}
            labelClassName={classNames?.label}
            descriptionClassName={classNames?.description}
            titleClassName={classNames?.title}
            actionsClassName={classNames?.actions}
          >
            {/* A bare string is an anonymous grid item with no slot context to
                claim a cell, so wrap it — `<TextValue>` defaults to
                `slot="label"`. */}
            {typeof children === 'string' ? (
              <TextValue>{children}</TextValue>
            ) : (
              children
            )}
          </ItemChildren>
        </>
      )}
    </RACGridListItem>
  );
};
