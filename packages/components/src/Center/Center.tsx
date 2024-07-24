import { ReactNode } from 'react';

import { GapSpaceProp, cn, createVar, gapSpace } from '@marigold/system';

export interface CenterProps extends GapSpaceProp {
  children?: ReactNode;
  /**
   * The maximum width of the container.
   * @default 100%
   */
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
      {...props}
      className={cn(
        'me-[auto] ms-[auto] box-content flex flex-col items-center justify-center',
        gapSpace[space],
        'max-w-[--maxWidth]'
      )}
      style={createVar({ maxWidth })}
    >
      {children}
    </div>
  );
};
