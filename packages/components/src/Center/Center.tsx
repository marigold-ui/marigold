import { ReactNode } from 'react';

import { GapSpaceProp, cn, createVar, gapSpace } from '@marigold/system';
import { HtmlProps } from '@marigold/types';

export interface CenterProps extends HtmlProps<'div'>, GapSpaceProp {
  children?: ReactNode;
  maxWidth?: string;
}

export const Center = ({
  maxWidth = '100%',
  space = 0,
  children,
  ...props
}: CenterProps) => {
  return (
    <div
      className={cn(
        'me-[auto] ms-[auto] box-content flex flex-col items-center justify-center',
        gapSpace[space],
        'max-w-[--maxWidth]'
      )}
      style={createVar({ maxWidth })}
      {...props}
    >
      {children}
    </div>
  );
};
