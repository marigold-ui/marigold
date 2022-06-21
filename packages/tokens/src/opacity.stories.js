import React from 'react';
import { Box, Stack } from '@marigold/components';
import * as Token from '.';
export default {
  title: 'Token',
};
export const Opacity = () =>
  React.createElement(
    Stack,
    { space: '12px' },
    Object.entries(Token.opacity).map(([name, value]) =>
      React.createElement(
        Box,
        {
          key: name,
          css: {
            display: 'grid',
            placeItems: 'center',
            color: value > 0 ? Token.color.gray['00'] : Token.color.gray['90'],
            bg: Token.color.gray['80'],
            blockSize: 100,
            aspectRatio: Token.aspect.square,
            opacity: value,
          },
        },
        name
      )
    )
  );
//# sourceMappingURL=opacity.stories.js.map
