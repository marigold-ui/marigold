import type { ReactNode } from 'react';
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
  const { classNames, headerHeadingProps, headerTextProps, headerActionProps } =
    usePanelContext();

  return (
    <Provider
      values={[
        [HeadingContext, headerHeadingProps],
        [TextContext, headerTextProps],
        [ActionButtonContext, headerActionProps],
        [ActionGroupContext, headerActionProps],
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
