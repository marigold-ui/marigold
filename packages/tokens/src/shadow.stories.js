import React from 'react';
import { Box, Stack } from '@marigold/components';
import * as Token from '.';
export default {
  title: 'Token',
};
export const Shadows = () => {
  const Shadow = ({ value }) =>
    React.createElement(Box, {
      css: {
        height: 100,
        width: 100,
        bg: Token.color.gray['00'],
        boxShadow: value,
      },
    });
  const shadow = Token.shadow;
  return React.createElement(
    Box,
    { bg: Token.color.gray['30'], p: 40 },
    React.createElement(
      Stack,
      { space: '32px', alignX: 'center' },
      Object.values(shadow).map(value =>
        React.createElement(Shadow, { key: value, value: value })
      )
    )
  );
};
//# sourceMappingURL=shadow.stories.js.map
