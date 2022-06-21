import React from 'react';
import { Box, Stack } from '@marigold/components';
import * as Token from '.';
export default {
  title: 'Token',
};
export const Aspects = () =>
  React.createElement(
    Stack,
    { space: '12px' },
    Object.entries(Token.aspect).map(([name, value]) =>
      React.createElement(
        Box,
        {
          key: name,
          css: {
            display: 'grid',
            placeItems: 'center',
            color: Token.color.gray['00'],
            bg: Token.color.gray['80'],
            blockSize: 100,
            aspectRatio: value,
          },
        },
        name
      )
    )
  );
//# sourceMappingURL=aspect.stories.js.map
