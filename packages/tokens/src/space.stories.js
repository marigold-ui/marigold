import React from 'react';
import { Box, Inline } from '@marigold/components';
import * as Token from '.';
export default {
  title: 'Token/Space',
};
export const Fixed = () =>
  React.createElement(
    Inline,
    { space: '12px' },
    Object.values(Token.space.fixed).map(value =>
      React.createElement(
        Box,
        {
          css: {
            display: 'grid',
            placeItems: 'center',
            color: Token.color.gray['00'],
            lineHeight: 1,
            bg: Token.color.gray['80'],
            p: value,
          },
        },
        'Content'
      )
    )
  );
export const Fluid = () =>
  React.createElement(
    Inline,
    { space: '12px' },
    Object.values(Token.space.fluid).map(value =>
      React.createElement(
        Box,
        {
          css: {
            display: 'grid',
            placeItems: 'center',
            color: Token.color.gray['00'],
            lineHeight: 1,
            bg: Token.color.gray['80'],
            p: value,
          },
        },
        'Content'
      )
    )
  );
//# sourceMappingURL=space.stories.js.map
