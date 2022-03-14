import React, { ReactChild } from 'react';
import { ResponsiveStyleValue } from '@marigold/system';

import { Box } from '../Box';

export interface AsideProps {
  children: [ReactChild, ReactChild];
  side?: 'left' | 'right';
  sideWidth?: ResponsiveStyleValue<string>;
  space?: ResponsiveStyleValue<string>;
  stretch?: boolean;
}

/**
 * Apply CSS depending on which element should serve as sidebar.
 */
const SIDE_MAP = {
  left: [':first-child', ':last-child'],
  right: [':last-child', ':first-child'],
};

export const Aside = ({
  children,
  side = 'left',
  space = 'none',
  stretch = true,
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
          flexGrow: 1,
        },

        [`> ${content}`]: {
          flexBasis: 0,
          flexGrow: 999,
          minInlineSize: '50%',
        },
      }}
    >
      {children}
    </Box>
  );
};
