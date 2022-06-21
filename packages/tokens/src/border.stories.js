import React from 'react';
import { Box, Inline, Stack } from '@marigold/components';
import * as Token from '.';
export default {
  title: 'Token/Border',
};
export const Size = () =>
  React.createElement(
    Inline,
    { space: '12px' },
    Object.values(Token.border.width).map(value =>
      React.createElement(Box, {
        key: value,
        css: {
          width: 100,
          height: 100,
          bg: Token.color.gray['20'],
          borderStyle: 'solid',
          borderColor: Token.color.gray['80'],
          borderWidth: value,
        },
      })
    )
  );
export const Radius = () =>
  React.createElement(
    Stack,
    { space: '12px' },
    Object.values(Token.border.radius).map(value =>
      React.createElement(Box, {
        key: value,
        css: {
          width: 200,
          height: 200,
          borderStyle: 'solid',
          borderColor: Token.color.gray['80'],
          borderWidth: Token.border.width['medium-1'],
          borderRadius: value,
        },
      })
    )
  );
//# sourceMappingURL=border.stories.js.map
