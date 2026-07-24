import type { ReactNode, Ref } from 'react';
import { Children, isValidElement, use, useMemo } from 'react';
import type RAC from 'react-aria-components';
import { GridListItem as RACGridListItem } from 'react-aria-components/GridList';
import { HeadingContext } from 'react-aria-components/Heading';
import { TextContext } from 'react-aria-components/Text';
import { Provider } from 'react-aria-components/slots';
import { ButtonContext as MarigoldButtonContext } from '../Button/Context';
import { Description } from '../Description/Description';
import { TextValue } from '../TextValue/TextValue';
import { Title } from '../Title/Title';
import type { SlottedContextValue } from '../utils/useMergedTextSlots';
import { useMergedTextSlots } from '../utils/useMergedTextSlots';
import { useListViewContext } from './Context';

// A row's content is authored as flat children (no wrapper required from the
// consumer): `<TextValue>`/`<Description>`/`<Title>` mark the "text" portion
// of the row. Anything before the first of those is treated as leading
// content (e.g. an icon or image); anything after the last is treated as
// trailing content (e.g. a `Switch`/`IconButton`/`ActionMenu`). This is what
// lets a bare `<Switch>` land in the trailing slot even though — unlike
// `Button`/`IconButton`/`ActionMenu` — it doesn't consume `ButtonContext` and
// so can't be positioned purely via context-injected className.
const TEXT_TYPES = new Set<unknown>([TextValue, Description, Title]);

const isTextChild = (child: ReactNode) =>
  isValidElement(child) && TEXT_TYPES.has(child.type);

const splitChildren = (children: ReactNode) => {
  const items = Children.toArray(children);
  const first = items.findIndex(isTextChild);

  if (first === -1) {
    return { leading: [], content: items, trailing: [] };
  }

  const last = items.findLastIndex(isTextChild);

  return {
    leading: items.slice(0, first),
    content: items.slice(first, last + 1),
    trailing: items.slice(last + 1),
  };
};

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
  leadingClassName?: string;
  contentClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  titleClassName?: string;
  actionClassName?: string;
}

const EMPTY_HEADING_CTX: SlottedContextValue = {};

// A trailing action in a row is low-emphasis chrome, so a nested Marigold
// `<Button>`/`<IconButton>`/`<ActionMenu>` defaults to `ghost` (a local
// `variant` still wins). Mirrors `SelectList.Option`'s cascade. Positioning
// (unlike SelectList.Option) comes from the `trailing` wrapper `<div>`, not
// from injecting a className into `ButtonContext` — that wrapper also has to
// hold non-Button controls like `<Switch>`, so it can't rely on context alone.
const ITEM_BUTTON_CASCADE = { variant: 'ghost' };

// Merge (not replace) RAC's slot configs on Text/Heading/Button contexts so
// nested slotted children pick up our theme classNames without losing RAC's
// wiring. The `title` slot additionally forces `as: 'span'` so a row's
// `<Title>` never emits a real `<hN>` — a list must not produce one document
// heading per row, which would destroy the heading outline for screen-reader
// users. `<Title>` already supports rendering as a span via this slot config
// (see `Panel.CollapsibleHeader`); we just supply it here.
const ItemChildren = ({
  children,
  leadingClassName,
  contentClassName,
  labelClassName,
  descriptionClassName,
  titleClassName,
  actionClassName,
}: ItemChildrenProps) => {
  const parentHeading = use(HeadingContext) as
    | typeof EMPTY_HEADING_CTX
    | undefined;
  const parentHeadingSlots = (parentHeading ?? EMPTY_HEADING_CTX).slots;

  const textContextValue = useMergedTextSlots({
    label: labelClassName,
    description: descriptionClassName,
  });

  const headingContextValue = useMemo(
    () => ({
      slots: {
        ...parentHeadingSlots,
        title: {
          ...(parentHeadingSlots?.title ?? {}),
          as: 'span',
          className: titleClassName,
        },
      },
    }),
    [parentHeadingSlots, titleClassName]
  );

  const { leading, content, trailing } = useMemo(
    () => splitChildren(children),
    [children]
  );

  return (
    <Provider
      values={[
        [TextContext, textContextValue],
        [HeadingContext, headingContextValue],
      ]}
    >
      {leading.length > 0 && <div className={leadingClassName}>{leading}</div>}
      <div className={contentClassName}>{content}</div>
      {trailing.length > 0 && (
        <Provider values={[[MarigoldButtonContext, ITEM_BUTTON_CASCADE]]}>
          <div className={actionClassName}>{trailing}</div>
        </Provider>
      )}
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
  const resolvedTextValue =
    textValue ?? (typeof children === 'string' ? children : undefined);

  if (
    process.env.NODE_ENV !== 'production' &&
    resolvedTextValue === undefined
  ) {
    console.warn(
      `[ListView.Item${props.id !== undefined ? ` id="${props.id}"` : ''}] ` +
        '`textValue` is required when children is not a plain string. ' +
        'Screen readers announce the `textValue` as the row name.'
    );
  }

  return (
    <RACGridListItem
      isDisabled={disabled}
      textValue={resolvedTextValue}
      {...props}
      className={classNames?.item}
      ref={ref}
    >
      <ItemChildren
        leadingClassName={classNames?.leading}
        contentClassName={classNames?.content}
        labelClassName={classNames?.label}
        descriptionClassName={classNames?.description}
        titleClassName={classNames?.title}
        actionClassName={classNames?.action}
      >
        {children}
      </ItemChildren>
    </RACGridListItem>
  );
};
