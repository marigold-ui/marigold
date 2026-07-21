import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { HeadingContext, Provider, TextContext } from 'react-aria-components';
import { cn } from '@marigold/system';
import { ButtonContext } from '../Button/Context';
import { usePageContext } from './Context';

export interface PageHeaderProps {
  /**
   * Content of the header. Typically a `<Title>`, an optional `<Description>`,
   * and an optional primary action: a `<Button variant="primary">`, a
   * `<LinkButton variant="primary">`, or a `<ButtonGroup>` / `<ActionMenu>`
   * cluster.
   *
   * Unlike `Panel.Header` (low-emphasis ghost chrome), the action slot here
   * renders a prominent, label-sized action. The header publishes the slot
   * context, so the action lands in the action cell without any per-call
   * placement props.
   *
   * Icon-only actions (a bare-icon `<Button>` or an `<ActionMenu>` kebab) must
   * carry an `aria-label` for an accessible name, since the header does not
   * supply one.
   */
  children: ReactNode;
}

/**
 * `<Page.Header>` mirrors `<Panel.Header>`: it is a slot-context provider that
 * lays out `<Title>`, `<Description>`, and actions in a two-column grid. The
 * title id, heading level, and slot ref come from the surrounding `<Page>` so
 * the page's `<main>` is labelled by its `<h1>`.
 */
export const PageHeader = ({ children }: PageHeaderProps) => {
  const { classNames, headingLevel, titleId, titleSlotRef } = usePageContext();

  // Re-publish (rather than inherit) the title slot config from the Page root:
  // Provider values do not merge, so `level`, `id`, and `ref` must be restated.
  // The added contribution is `[grid-area:title]` for the header's grid.
  const headingProps = useMemo(
    () => ({
      slots: {
        title: {
          className: cn('[grid-area:title]', classNames.title),
          'data-grid-area': 'title',
          level: headingLevel,
          id: titleId,
          ref: titleSlotRef,
        },
      },
    }),
    [classNames.title, headingLevel, titleId, titleSlotRef]
  );

  const textProps = useMemo(
    () => ({
      slots: {
        description: {
          className: cn('[grid-area:description]', classNames.description),
          'data-grid-area': 'description',
          elementType: 'p' as const,
        },
      },
    }),
    [classNames.description]
  );

  // One `ButtonContext` lets every header action (`<Button>`, `<ButtonGroup>`,
  // `<ActionMenu>`, `<LinkButton>`) claim the `actions` grid cell. Unlike
  // `Panel.Header` (ghost `size: 'icon'` chrome), page actions are prominent
  // and label-sized, so neither `variant` nor `size` is cascaded: the page's
  // primary action sets `variant="primary"` itself, and a `<ButtonGroup>`
  // cascades its own `secondary` baseline to children. A `<ButtonGroup>`
  // re-provides its own context, so the positional className stays on the
  // group, not its buttons.
  const actionProps = useMemo(
    () => ({
      className: cn('self-center [grid-area:actions]', classNames.actions),
      'data-grid-area': 'actions',
    }),
    [classNames.actions]
  );

  return (
    <Provider
      values={[
        [HeadingContext, headingProps],
        [TextContext, textProps],
        [ButtonContext, actionProps],
      ]}
    >
      <div
        data-page-header
        className={cn(
          "grid grid-cols-[1fr_auto] [grid-template-areas:'title_actions'_'description_actions']",
          classNames.header
        )}
      >
        {children}
      </div>
    </Provider>
  );
};
