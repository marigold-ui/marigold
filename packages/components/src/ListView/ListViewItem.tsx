import type { ReactNode, Ref } from 'react';
import { use, useMemo } from 'react';
import type RAC from 'react-aria-components';
import { GridListItem as RACGridListItem } from 'react-aria-components/GridList';
import { HeadingContext } from 'react-aria-components/Heading';
import { TextContext } from 'react-aria-components/Text';
import { Provider } from 'react-aria-components/slots';
import type { SlottedContextValue } from '../utils/useMergedTextSlots';
import { useListViewContext } from './Context';

// A row's content is authored as flat children (no wrapper required from the
// consumer) and laid out by the row's CSS grid — nothing here inspects the
// children to decide where they go:
//   - `<TextValue>`/`<Title>` claim the label cell and `<Description>` the
//     lines below it, through the `label`/`title`/`description` slot configs
//     published here. Because that travels by context, it holds however the
//     element is authored — directly, inside a fragment, behind `memo()`, or
//     from a consumer's own component.
//   - Trailing controls go in `<ListView.Actions>`, which owns the trailing
//     cell (a `<Switch>` reads no context, and one grid cell can't lay out
//     several controls on its own).
//   - Leading media is placed by the row's `:first-child:not([data-grid-area])`
//     rule in the theme — the one positional rule left, and it keys on the
//     DOM, where fragments and wrappers leave nothing behind.
// Each slot config also publishes `data-grid-area`, both to drive that rule
// and to make placement assertable in a test.

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

  return (
    <Provider
      values={[
        [TextContext, textContextValue],
        [HeadingContext, headingContextValue],
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
      >
        {children}
      </ItemChildren>
    </RACGridListItem>
  );
};
