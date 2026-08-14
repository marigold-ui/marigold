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
import type { SlottedContextValue } from '../utils/useMergedTextSlots';
import { useListViewContext } from './Context';

// A row's content is authored as flat children and laid out by the row's CSS
// grid. Nothing here inspects the children to decide where they go — every
// region claims its cell through a slot context, so placement holds however
// the element is authored: directly, inside a fragment, behind `memo()`, or
// from a consumer's own component.
//   - `<TextValue>`/`<Title>` claim the label cell and `<Description>` the
//     line below it, via the `label`/`title`/`description` slot configs.
//   - Trailing controls (`<Button>`, `<ActionMenu>`, `<LinkButton>`, or a
//     `<ButtonGroup>` wrapping several) claim the actions cell via Marigold's
//     `ButtonContext`, the cascade `Panel.Header` and `SelectList.Option` use.
// Content that claims nothing — a `<Badge>`, an un-slotted `<Text>` — is
// auto-placed by the grid and moves as the row's other children change, so
// the trailing cell supports Button-family controls only (see DST-1681).
// Each slot config also publishes `data-grid-area`, which makes placement
// assertable in a test rather than inferred.

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

// Every Button-family child reads the row's `ButtonContext`, so two of them
// are two elements explicitly placed in the same cell — they stack, and
// whichever paints last takes the clicks. The types can't express "wrap
// several in a `<ButtonGroup>`", so warn once at authoring time, the way
// `ToggleButtonGroup` warns about `selectionMode`.
//
// This hook belongs to `ItemChildren`, not to `ListViewItem`: RAC renders a
// static collection twice — once to build the collection, then again for the
// DOM — and only the second pass runs inside the row element, so `row.current`
// is still `null` in an effect one level up.
let hasWarnedStackedActions = false;

// Test-only: lets each test assert the warning independently instead of
// racing whichever test file happens to trip it first. Not part of the
// package's public API (not re-exported from `packages/components/src/index.ts`).
export const __resetStackedActionsWarning = () => {
  hasWarnedStackedActions = false;
};

const useStackedActionsWarning = (row: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' || hasWarnedStackedActions) {
      return;
    }

    // Counts what the context actually reached, not what was authored: a
    // `<ButtonGroup>` re-provides a fresh context, so its buttons don't carry
    // the attribute and a grouped row stays at one.
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

// Merge (not replace) RAC's slot configs on the Text/Heading contexts so
// nested slotted children pick up our theme classNames without losing RAC's
// wiring. The `title` slot additionally forces `as: 'span'` so a row's
// `<Title>` never emits a real `<hN>` — a list must not produce one document
// heading per row, which would destroy the heading outline for screen-reader
// users. `<Title>` already supports rendering as a span via this slot config
// (see `Panel.CollapsibleHeader`); we just supply it here.
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
          // `label`, not `title`: `<Title>` is the other way to author a
          // row's primary text and lands in the same cell, and this attribute
          // names the cell an element occupies.
          'data-grid-area': 'label',
        },
      },
    }),
    [parentHeadingSlots, titleClassName]
  );

  // Marigold `Button`/`LinkButton`/`ActionMenu` read this context, so the
  // actions cell and the low-emphasis `ghost` default travel to whichever of
  // them a row carries; a local `variant` still wins. A `<ButtonGroup>` reads
  // it too and re-provides a fresh one, so a row with several controls keeps
  // the positional className on the group and the cascade on its buttons.
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
  // No warning of our own when this stays `undefined`: RAC's `GridList`
  // already warns on exactly that condition, and its warning can't be
  // suppressed — adding one here means two console lines for one mistake.
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
      <ItemChildren
        row={rowRef}
        labelClassName={classNames?.label}
        descriptionClassName={classNames?.description}
        titleClassName={classNames?.title}
        actionsClassName={classNames?.actions}
      >
        {/* A bare string would become an anonymous grid item: no element for
            a slot context or a selector to reach, so it lands unstyled in
            whichever cell is free. Wrapping it in `<TextValue>` (which
            defaults to `slot="label"`) gives the shorthand the same cell and
            styling as the explicit form. */}
        {typeof children === 'string' ? (
          <TextValue>{children}</TextValue>
        ) : (
          children
        )}
      </ItemChildren>
    </RACGridListItem>
  );
};
