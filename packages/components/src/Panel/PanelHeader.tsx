import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { HeadingContext, Provider, TextContext } from 'react-aria-components';
import { cn } from '@marigold/system';
import { ButtonContext } from '../Button/Context';
import { usePanelContext } from './Context';

export interface PanelHeaderProps {
  /**
   * Content of the header. Typically a `<Title>`, optional `<Description>`,
   * and optional buttons (`<Button>`, `<ButtonGroup>`, `<ActionMenu>`,
   * `<LinkButton>`).
   *
   * A bare `<Button>` IS slot-aware here: it claims the `actions` grid cell
   * and adopts the header's icon size + ghost variant via `ButtonContext`.
   * Opt a button out of the cascade with `slot={null}`.
   */
  children: ReactNode;
}

export const PanelHeader = ({ children }: PanelHeaderProps) => {
  const { classNames, headingLevel, titleId, titleSlotRef } = usePanelContext();

  // This Provider value fully replaces the `HeadingContext` published at
  // the Panel root for descendants of the header. `level`, `id`, and `ref`
  // are re-published (rather than inherited) because Provider values do
  // not merge — anything we omit here would be lost for `<Title>` inside
  // `<Panel.Header>`. The added contribution is `[grid-area:title]`, which
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

  // A single `ButtonContext` value drives the whole button subsystem in the
  // header. A bare `<Button>`, a `<ButtonGroup>`, an `<ActionMenu>`, and a
  // `<LinkButton>` all claim the `actions` grid cell with the same styling.
  // `size: 'icon'` + `variant: 'ghost'` reproduce the old `ActionButton`
  // default look; a `<ButtonGroup>` re-provides its own context to children,
  // so the positional className stays on the group, not its buttons.
  const actionProps = useMemo(
    () => ({
      className: cn('self-center [grid-area:actions]', classNames.actions),
      'data-grid-area': 'actions',
      variant: 'ghost' as const,
      size: 'icon' as const,
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
        data-panel-header
        className={cn(
          "grid grid-cols-[1fr_auto] [grid-template-areas:'title_actions'_'description_actions']",
          'px-(--panel-px)',
          classNames.header
        )}
      >
        {children}
      </div>
    </Provider>
  );
};
