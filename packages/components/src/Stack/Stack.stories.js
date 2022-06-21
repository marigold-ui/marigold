import React from 'react';
import { Box } from '@marigold/system';
import { shadow } from '@marigold/tokens';
import { Headline } from '../Headline';
import { Text } from '../Text';
import { Stack } from './Stack';
export default {
  title: 'Components/Stack',
  argTypes: {
    space: {
      control: {
        type: 'select',
      },
      options: [
        'none',
        'xxsmall',
        'xsmall',
        'small',
        'medium',
        'large',
        'xlarge',
        'xxlarge',
      ],
      description: 'Responsive Style Value',
    },
    alignX: {
      control: {
        type: 'select',
      },
      options: ['left', 'center', 'right'],
      description: 'Vertical Alignment',
    },
    alignY: {
      control: {
        type: 'select',
      },
      options: ['top', 'center', 'bottom'],
      description: 'Vertical Alignment',
    },
    stretch: {
      control: {
        type: 'boolean',
      },
      description:
        'Stretch to fill space (useful if you want to change y alignment)',
    },
  },
};
export const Basic = args =>
  React.createElement(
    Stack,
    { ...args },
    React.createElement(Headline, { level: '2' }, 'Heading'),
    React.createElement(
      Text,
      null,
      'Part 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dignissim dapibus elit, vel egestas felis pharetra non. Cras malesuada, massa nec ultricies efficitur, lectus ante consequat magna, a porttitor massa ex ut quam.'
    ),
    React.createElement(
      Text,
      null,
      'Part 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dignissim dapibus elit, vel egestas felis pharetra non. Cras malesuada, massa nec ultricies efficitur, lectus ante consequat magna, a porttitor massa ex ut quam.'
    )
  );
export const Nested = args =>
  React.createElement(
    Stack,
    { ...args },
    React.createElement(
      Stack,
      { space: 'xsmall' },
      React.createElement(Headline, { level: '2' }, 'Heading'),
      React.createElement(
        Text,
        null,
        'Part 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dignissim dapibus elit, vel egestas felis pharetra non. Cras malesuada, massa nec ultricies efficitur, lectus ante consequat magna, a porttitor massa ex ut quam.'
      ),
      React.createElement(
        Text,
        null,
        'Part 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dignissim dapibus elit, vel egestas felis pharetra non. Cras malesuada, massa nec ultricies efficitur, lectus ante consequat magna, a porttitor massa ex ut quam.'
      )
    ),
    React.createElement(
      Stack,
      { space: 'xsmall' },
      React.createElement(Headline, { level: '2' }, 'Heading'),
      React.createElement(
        Text,
        null,
        'Part 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dignissim dapibus elit, vel egestas felis pharetra non. Cras malesuada, massa nec ultricies efficitur, lectus ante consequat magna, a porttitor massa ex ut quam.'
      ),
      React.createElement(
        Text,
        null,
        'Part 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dignissim dapibus elit, vel egestas felis pharetra non. Cras malesuada, massa nec ultricies efficitur, lectus ante consequat magna, a porttitor massa ex ut quam.'
      )
    )
  );
export const List = args =>
  React.createElement(
    Stack,
    { space: 'large' },
    React.createElement(
      Stack,
      { as: 'ol', ...args },
      React.createElement('li', null, 'one'),
      React.createElement('li', null, 'two'),
      React.createElement('li', null, 'three')
    ),
    React.createElement(
      Stack,
      { as: 'ul', ...args },
      React.createElement('li', null, 'one'),
      React.createElement('li', null, 'two'),
      React.createElement('li', null, 'three')
    )
  );
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
export const Stretch = args =>
  React.createElement(
    Box,
    { css: { height: 300 } },
    React.createElement(
      Stack,
      { ...args },
      React.createElement(Block, null, 'Lirum'),
      React.createElement(Block, null, 'Larum'),
      React.createElement(Block, null, 'L\u00F6ffelstiel!')
    )
  );
//# sourceMappingURL=Stack.stories.js.map
