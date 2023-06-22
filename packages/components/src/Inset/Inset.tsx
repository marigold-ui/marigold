import React, { ReactNode } from 'react';
import {
  PaddingSpacePropX,
  PaddingSpacePropY,
  PaddingSpaceProp,
  paddingSpace,
  paddingSpaceX,
  paddingSpaceY,
  cn,
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

export const Inset = ({
  space = 0,
  spaceX = 0,
  spaceY = 0,
  children,
}: InsetProps) => (
  <div
    className={cn(
      space ? paddingSpace[space] : paddingSpaceX[spaceX],
      paddingSpaceY[spaceY]
    )}
  >
    {children}
  </div>
);
