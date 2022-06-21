import React from 'react';
import { Box, Inline, Stack } from '@marigold/components';
import * as Token from '.';
export default {
  title: 'Token',
};
export const Colors = () => {
  const Color = ({ value }) =>
    React.createElement(Box, { css: { height: 50, width: 120, bg: value } });
  const List = ({ color }) =>
    React.createElement(
      Inline,
      null,
      Object.values(color).map(value =>
        React.createElement(Color, { key: value, value: value })
      )
    );
  const { brand, ...colors } = Token.color;
  return React.createElement(
    Stack,
    { space: '12px' },
    React.createElement(List, { color: brand }),
    Object.keys(colors).map(name =>
      React.createElement(List, { key: name, color: Token.color[name] })
    )
  );
};
//# sourceMappingURL=color.stories.js.map
