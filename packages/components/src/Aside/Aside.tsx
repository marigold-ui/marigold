import { Children, type ReactElement } from 'react';

import { GapSpaceProp, cn, createVar, gapSpace } from '@marigold/system';
import { NonZeroPercentage } from '@marigold/types';

export interface AsideProps extends GapSpaceProp {
  children: [ReactElement, ReactElement];
  side?: 'left' | 'right';
  sideWidth?: string;
  stretch?: boolean;
  wrap?: NonZeroPercentage;
}

/**
 * Apply CSS depending on which element should serve as sidebar.
 */
const classNames = {
  aside: 'grow basis-[--sideWidth]',
  content: 'basis-0 grow-[999] [min-inline-size:--wrap]',
};

export const Aside = ({
  children,
  sideWidth,
  space = 0,
  side = 'left',
  stretch = true,
  wrap = '50%',
}: AsideProps) => {
  const [left, right] = Children.toArray(children);
  const vars = {
    aside: createVar({ sideWidth }),
    content: createVar({ wrap }),
  };

  return (
    <div
      className={cn(
        'flex flex-wrap',
        gapSpace[space],
        !stretch && 'items-start'
      )}
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
