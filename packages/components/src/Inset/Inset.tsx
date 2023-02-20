import React, { ReactNode } from 'react';
import { Box, ResponsiveStyleValue } from '@marigold/system';

export type InsetProps =
  | {
      children: ReactNode;
      space?: never;
      spaceX?: ResponsiveStyleValue<string>;
      spaceY?: ResponsiveStyleValue<string>;
    }
  | {
      children: ReactNode;
      space?: ResponsiveStyleValue<string>;
      spaceX?: never;
      spaceY?: never;
    };

export const Inset = ({ space, spaceX, spaceY, children }: InsetProps) => (
  <Box css={space ? { p: space } : { px: spaceX, py: spaceY }}>{children}</Box>
);
