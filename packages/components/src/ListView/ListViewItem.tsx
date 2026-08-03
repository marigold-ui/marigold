import type { ReactNode, Ref } from 'react';
import { use, useMemo } from 'react';
import type RAC from 'react-aria-components';
import { GridListItem as RACGridListItem } from 'react-aria-components/GridList';
import { HeadingContext } from 'react-aria-components/Heading';
import { TextContext } from 'react-aria-components/Text';
import { Provider } from 'react-aria-components/slots';
import { ButtonContext as MarigoldButtonContext } from '../Button/Context';
import { TextValue } from '../TextValue/TextValue';
import type { SlottedContextValue } from '../utils/useMergedTextSlots';
import { useListViewContext } from './Context';

// A row's content is authored as flat children (no wrapper required from the
// consumer) and laid out by the row's CSS grid. Nothing here inspects the
// children to decide where they go — every region claims its cell through a
// slot context, so placement holds however the element is authored: directly,
// inside a fragment, behind `memo()`, or from a consumer's own component.
//   - `<TextValue>`/`<Title>` claim the label cell and `<Description>` the
//     lines below it, via the `label`/`title`/`description` slot configs.
//   - Trailing controls (`<Button>`, `<ActionMenu>`, `<LinkButton>`, or a
//     `<ButtonGroup>` wrapping several) claim the actions cell via Marigold's
//     `ButtonContext`, the same cascade `Panel.Header` and `SelectList.Option`
//     use.
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
  labelClassName?: string;
  descriptionClassName?: string;
  titleClassName?: string;
  actionClassName?: string;
}

// Merge (not replace) RAC's slot configs on the Text/Heading contexts so
// nested slotted children pick up our theme classNames without losing RAC's
// wiring. The `title` slot additionally forces `as: 'span'` so a row's
// `<Title>` never emits a real `<hN>` — a list must not produce one document
// heading per row, which would destroy the heading outline for screen-reader
// users. `<Title>` already supports rendering as a span via this slot config
// (see `Panel.CollapsibleHeader`); we just supply it here.
const ItemChildren = ({
  children,
  labelClassName,
  descriptionClassName,
  titleClassName,
  actionClassName,
}: ItemChildrenProps) => {
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
          'data-grid-area': 'title',
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
      className: actionClassName,
      'data-grid-area': 'actions',
      variant: 'ghost',
    }),
    [actionClassName]
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
      ref={ref}
    >
      <ItemChildren
        labelClassName={classNames?.label}
        descriptionClassName={classNames?.description}
        titleClassName={classNames?.title}
        actionClassName={classNames?.action}
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
