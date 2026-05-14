import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { HeadingContext, Provider, TextContext } from 'react-aria-components';
import { cn } from '@marigold/system';
import { ActionButtonContext } from '../ActionButton/Context';
import { ActionGroupContext } from '../ActionGroup/Context';
import { usePanelContext } from './Context';

export interface PanelHeaderProps {
  /**
   * Content of the header. Typically a `<Title>`, optional `<Description>`,
   * and optional action primitives (`<ActionButton>`, `<ActionGroup>`,
   * `<ActionMenu>`, `<LinkButton>`).
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
          elementType: 'p' as const,
        },
      },
    }),
    [classNames.description]
  );

  const actionProps = useMemo(
    () => ({
      className: cn('self-center [grid-area:actions]', classNames.actions),
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
