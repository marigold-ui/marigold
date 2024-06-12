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
      /**
       * The children of the component
       */
      children: ReactNode;
      space?: never;
      /**
       * Horizontal alignment for the children
       */
      spaceX?: PaddingSpacePropX['spaceX'];
      /**
       * Vertical alignment for the children
       */
      spaceY?: PaddingSpacePropY['spaceY'];
    }
  | {
      children: ReactNode;
      /**
       * The space between the children
       */
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
