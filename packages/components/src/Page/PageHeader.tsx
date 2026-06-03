import type { ReactNode } from 'react';
import { useMemo } from 'react';
import {
  ButtonContext,
  HeadingContext,
  Provider,
  TextContext,
} from 'react-aria-components';
import { cn } from '@marigold/system';
import { ActionButtonContext } from '../ActionButton/Context';
import { ActionGroupContext } from '../ActionGroup/Context';
import { usePageContext } from './Context';

export interface PageHeaderProps {
  /**
   * Content of the header. Typically a `<Title>`, an optional `<Description>`,
   * and an optional primary action: a `<Button variant="primary">`, a
   * `<LinkButton variant="primary">`, or an `<ActionGroup>` / `<ActionMenu>`
   * cluster.
   *
   * Unlike `Panel.Header`, the action slot here renders a prominent,
   * label-sized action. The header publishes the slot context, so the action
   * lands in the action cell without any per-call placement props.
   */
  children: ReactNode;
}

/**
 * `<Page.Header>` mirrors `<Panel.Header>`: it is a slot-context provider that
 * lays out `<Title>`, `<Description>`, and action primitives in a two-column
 * grid. The title id, heading level, and slot ref come from the surrounding
 * `<Page>` so the page's `<main>` is labelled by its `<h1>`.
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

  // Published on both `ActionButtonContext` and `ActionGroupContext` so a
  // single `<ActionButton>` and an `<ActionGroup>` cluster both claim the
  // `actions` grid cell. Unlike `Panel.Header` (`size: 'icon'` chrome), page
  // actions are label-sized, so the size cascade is `'default'`.
  const actionProps = useMemo(
    () => ({
      className: cn('self-center [grid-area:actions]', classNames.actions),
      'data-grid-area': 'actions',
      size: 'default' as const,
    }),
    [classNames.actions]
  );

  // Interim stopgap until `<Button>` becomes slot-aware (DST-1360 follow-up):
  // publish RAC's `ButtonContext` so a plain `<Button variant="primary">`
  // claims the action cell. Mirrors `actionProps` placement, minus the
  // ActionButton size cascade (Button keeps its own default size).
  const buttonProps = useMemo(
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
        [ButtonContext, buttonProps],
        [ActionButtonContext, actionProps],
        [ActionGroupContext, actionProps],
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
