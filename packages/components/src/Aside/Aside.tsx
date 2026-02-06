import { Children } from 'react';
import type { ReactElement } from 'react';
import type { SpaceProp, SpacingTokens } from '@marigold/system';
import { cn, createSpacingVar, createVar } from '@marigold/system';
import type { AriaRegionProps, NonZeroPercentage } from '@marigold/types';

export interface AsideProps extends AriaRegionProps {
  /**
   * The children of the component.
   */
  children: [ReactElement, ReactElement];

  /**
   * Set the spacing between child elements.
   * @remarks `SpacingTokens<Tokens>`
   */
  space?: SpaceProp<SpacingTokens>['space'];

  /**
   * The side of the aside content.
   * @default left
   */
  side?: 'left' | 'right';
  /**
   * The width of the side content.
   */
  sideWidth?: string;
  /**
   * At what percentage of the content's width should the other content wrap beneath it
   * @default 50%
   * @remarks `NonZeroPercentage`
   */
  wrap?: NonZeroPercentage;
}

/**
 * Apply CSS depending on which element should serve as sidebar.
 */
const classNames = {
  aside: 'grow basis-(--sideWidth)',
  content: 'basis-0 grow-999 [min-inline-size:var(--wrap)]',
};

export const Aside = ({
  children,
  sideWidth,
  space = 0,
  side = 'left',
  wrap = '50%',
}: AsideProps) => {
  const [left, right] = Children.toArray(children);
  const vars = {
    aside: createVar({ sideWidth }),
    content: createVar({ wrap }),
  };

  return (
    <div
      className={cn('flex flex-wrap', 'gap-(--space)')}
      style={createSpacingVar('space', `${space}`)}
    >
      <div
        className={classNames[side === 'left' ? 'aside' : 'content']}
        style={vars[side === 'left' ? 'aside' : 'content']}
      >
        {left}
      </div>
      <div
        className={classNames[side === 'right' ? 'aside' : 'content']}
        style={vars[side === 'right' ? 'aside' : 'content']}
      >
        {right}
      </div>
    </div>
  );
};
