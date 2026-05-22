import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { HeadingContext, Provider, TextContext } from 'react-aria-components';
import { cn } from '@marigold/system';
import { ActionButtonContext } from '../ActionButton/Context';
import { ActionGroupContext } from '../ActionGroup/Context';
import { useCardContext } from './CardContext';

export interface CardHeaderProps {
  /**
   * Content of the header. Typically a `<Title>`, optional `<Description>`,
   * and optional action primitives (`<ActionButton>`, `<ActionGroup>`,
   * `<ActionMenu>`).
   *
   * Use the action primitives above for header chrome — a bare `<Button>`
   * is intentionally not slot-aware and won't pick up the size/grid cascade.
   */
  children?: ReactNode;
}

export const CardHeader = ({ children }: CardHeaderProps) => {
  const { classNames, headingLevel, titleId, titleSlotRef } = useCardContext();

  // This Provider value fully replaces the `HeadingContext` published at
  // the Card root for descendants of the header. `level`, `id`, and `ref`
  // are re-published (rather than inherited) because Provider values do
  // not merge — anything we omit here would be lost for `<Title>` inside
  // `<Card.Header>`. The added contribution is `[grid-area:title]`, which
  // lays the title out in the header's two-column grid.
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

  // Published as the same value on `ActionButtonContext` and
  // `ActionGroupContext` so a single `<ActionButton>` and an `<ActionGroup>`
  // of clustered actions both claim the `actions` grid cell with the same
  // styling. `size: 'icon'` is the correct cascade for both: a bare
  // `<ActionButton>` renders as an icon button, and an `<ActionGroup>`
  // propagates the size to its inner `<ActionButton>` children.
  const actionProps = useMemo(
    () => ({
      className: cn('self-center [grid-area:actions]', classNames.actions),
      'data-grid-area': 'actions',
      size: 'icon' as const,
    }),
    [classNames.actions]
  );

  return (
    <Provider
      values={[
        [HeadingContext, headingProps],
        [TextContext, textProps],
        [ActionButtonContext, actionProps],
        [ActionGroupContext, actionProps],
      ]}
    >
      <div
        data-card-header
        className={cn(
          "grid grid-cols-[1fr_auto] [grid-template-areas:'title_actions'_'description_actions']",
          'px-(--card-px)',
          classNames.header
        )}
      >
        {children}
      </div>
    </Provider>
  );
};
