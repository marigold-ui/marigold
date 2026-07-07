import type { ReactNode } from 'react';
import type { SpaceProp, SpacingTokens } from '@marigold/system';
import { cn, createSpacingVar } from '@marigold/system';
import { usePageContext } from './Context';

export interface PageContentProps {
  /**
   * Body of the page — typically the `<Panel>`s (and other sections) below
   * the `<Page.Header>`.
   */
  children: ReactNode;
  /**
   * Vertical rhythm between the content's sections. Lets the gap _between_
   * sections differ from the `<Page>`'s header-to-content gap.
   * @default 'regular'
   */
  space?: SpaceProp<SpacingTokens>['space'];
}

/**
 * `<Page.Content>` is an optional wrapper for the page body. Use it when the
 * rhythm between sections should differ from the `<Page>`'s header-to-content
 * gap; otherwise put `<Panel>`s directly inside `<Page>`.
 */
export const PageContent = ({
  children,
  space = 'regular',
}: PageContentProps) => {
  const { classNames } = usePageContext();

  return (
    <div
      data-page-content
      className={cn(
        'flex flex-col gap-y-(--page-content-gap)',
        classNames.content
      )}
      style={createSpacingVar('page-content-gap', `${space}`)}
    >
      {children}
    </div>
  );
};
