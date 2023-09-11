import { ReactNode } from 'react';

import {
  PaddingSpaceProp,
  PaddingSpacePropX,
  PaddingSpacePropY,
  cn,
  paddingSpace,
  paddingSpaceX,
  paddingSpaceY,
} from '@marigold/system';

export type InsetProps =
  | {
      children: ReactNode;
      space?: never;
      spaceX?: PaddingSpacePropX['spaceX'];
      spaceY?: PaddingSpacePropY['spaceY'];
    }
  | {
      children: ReactNode;
      space?: PaddingSpaceProp['space'];
      spaceX?: never;
      spaceY?: never;
    };

export const Inset = ({ space, spaceX, spaceY, children }: InsetProps) => (
  <div
    className={cn(
      space && paddingSpace[space],
      !space && spaceX && paddingSpaceX[spaceX],
      !space && spaceY && paddingSpaceY[spaceY]
    )}
  >
    {children}
  </div>
);
