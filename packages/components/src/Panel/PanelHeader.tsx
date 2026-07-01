import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { HeadingContext, Provider, TextContext } from 'react-aria-components';
import { cn } from '@marigold/system';
import { ButtonContext } from '../Button/Context';
import { usePanelContext } from './Context';

export interface PanelHeaderProps {
  /**
   * Content of the header: typically a `<Title>`, optional `<Description>`, and
   * optional actions (`<Button>`, `<ButtonGroup>`, `<ActionMenu>`,
   * `<LinkButton>`). Actions are slot-aware here, claiming the `actions` grid
   * cell and adopting the header's ghost styling; an icon-only action sets
   * `size="icon"` to render as a square. Opt out with `slot={null}`.
   */
  children: ReactNode;
}

export const PanelHeader = ({ children }: PanelHeaderProps) => {
  const { classNames, headingLevel, titleId, titleSlotRef } = usePanelContext();

  // Fully replaces the Panel root's `HeadingContext` for header descendants.
  // Provider values don't merge, so `level`/`id`/`ref` are re-published; the
  // added `[grid-area:title]` places the title in the header grid.
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

  // One `ButtonContext` gives every action in the header the same low-emphasis
  // ghost look in the `actions` grid cell. The size cascade is `small` so a
  // labelled action stays a readable button; icon-only actions (a bare-icon
  // `<Button>`, an `<ActionMenu>` kebab) opt into `size="icon"` themselves so
  // they render as a square. A `<ButtonGroup>` re-provides its own context, so
  // the positional className stays on the group, not its buttons.
  const actionProps = useMemo(
    () => ({
      className: cn('self-center [grid-area:actions]', classNames.actions),
      'data-grid-area': 'actions',
      variant: 'ghost' as const,
      size: 'small' as const,
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
