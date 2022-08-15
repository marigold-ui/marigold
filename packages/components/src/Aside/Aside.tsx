import React, { type ReactElement } from 'react';
import { ResponsiveStyleValue } from '@marigold/system';
import { NonZeroPercentage } from '@marigold/types';

import { Box } from '../Box';

export interface AsideProps {
  children: [ReactElement, ReactElement];
  side?: 'left' | 'right';
  sideWidth?: ResponsiveStyleValue<string>;
  space?: ResponsiveStyleValue<string>;
  stretch?: boolean;
  wrap?: NonZeroPercentage;
}

/**
 * Apply CSS depending on which element should serve as sidebar.
 */
const SIDE_MAP = {
  left: [':not(style):first-of-type', ':last-child'],
  right: [':last-child', ':not(style):first-of-type'],
};

export const Aside = ({
  children,
  sideWidth,
  space = 'none',
  side = 'left',
  stretch = true,
  wrap = '50%',
}: AsideProps) => {
  const [aside, content] = SIDE_MAP[side];

  return (
    <Box
      css={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: space,
        alignItems: stretch ? undefined : 'flex-start',

        [`> ${aside}`]: {
          flexBasis: sideWidth,
          flexGrow: 1,
        },

        [`> ${content}`]: {
          flexBasis: 0,
          flexGrow: 999,
          minInlineSize: wrap,
        },
      }}
    >
      {children}
    </Box>
  );
};
