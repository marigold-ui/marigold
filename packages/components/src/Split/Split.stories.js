import React from 'react';
import { Box } from '@marigold/system';
import { shadow } from '@marigold/tokens';
import { Inline } from '../Inline';
import { Stack } from '../Stack';
import { Split } from './Split';
const Block = ({ children }) =>
  React.createElement(
    Box,
    {
      css: {
        border: '1px solid #364fc7',
        borderRadius: 16,
        bg: '#4263eb',
        color: '#edf2ff',
        px: 32,
        py: 12,
        boxShadow: shadow['medium-1'],
      },
    },
    children
  );
export default {
  title: 'Components/Split',
  argTypes: {},
};
export const WithInline = () =>
  React.createElement(
    Inline,
    { space: 'medium' },
    React.createElement(Block, null, 'First'),
    React.createElement(Block, null, 'Second'),
    React.createElement(Split, null),
    React.createElement(Block, null, 'Third')
  );
export const WithStack = () =>
  React.createElement(
    Box,
    { css: { height: 400 } },
    React.createElement(
      Stack,
      { space: 'xsmall', stretch: true },
      React.createElement(Block, null, 'First'),
      React.createElement(Split, null),
      React.createElement(Block, null, 'Second'),
      React.createElement(Block, null, 'Third')
    )
  );
//# sourceMappingURL=Split.stories.js.map
