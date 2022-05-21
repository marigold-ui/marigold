import React, { ReactNode } from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
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
  },
} as Meta;

export const Basic: ComponentStory<typeof Stack> = args => (
  <Stack {...args}>
    <Headline level="2">Heading</Headline>
    <Text>
      Part 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Suspendisse dignissim dapibus elit, vel egestas felis pharetra non. Cras
      malesuada, massa nec ultricies efficitur, lectus ante consequat magna, a
      porttitor massa ex ut quam.
    </Text>
    <Text>
      Part 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Suspendisse dignissim dapibus elit, vel egestas felis pharetra non. Cras
      malesuada, massa nec ultricies efficitur, lectus ante consequat magna, a
      porttitor massa ex ut quam.
    </Text>
  </Stack>
);

export const Nested: ComponentStory<typeof Stack> = args => (
  <Stack {...args}>
    <Stack space="xsmall">
      <Headline level="2">Heading</Headline>
      <Text>
        Part 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Suspendisse dignissim dapibus elit, vel egestas felis pharetra non. Cras
        malesuada, massa nec ultricies efficitur, lectus ante consequat magna, a
        porttitor massa ex ut quam.
      </Text>
      <Text>
        Part 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Suspendisse dignissim dapibus elit, vel egestas felis pharetra non. Cras
        malesuada, massa nec ultricies efficitur, lectus ante consequat magna, a
        porttitor massa ex ut quam.
      </Text>
    </Stack>
    <Stack space="xsmall">
      <Headline level="2">Heading</Headline>
      <Text>
        Part 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Suspendisse dignissim dapibus elit, vel egestas felis pharetra non. Cras
        malesuada, massa nec ultricies efficitur, lectus ante consequat magna, a
        porttitor massa ex ut quam.
      </Text>
      <Text>
        Part 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Suspendisse dignissim dapibus elit, vel egestas felis pharetra non. Cras
        malesuada, massa nec ultricies efficitur, lectus ante consequat magna, a
        porttitor massa ex ut quam.
      </Text>
    </Stack>
  </Stack>
);

export const List: ComponentStory<typeof Stack> = args => (
  <Stack space="large">
    <Stack as="ol" {...args}>
      <li>one</li>
      <li>two</li>
      <li>three</li>
    </Stack>
    <Stack as="ul" {...args}>
      <li>one</li>
      <li>two</li>
      <li>three</li>
    </Stack>
  </Stack>
);

const Block = ({ children }: { children: ReactNode }) => (
  <Box
    css={{
      border: '1px solid #364fc7',
      borderRadius: 16,
      bg: '#4263eb',
      color: '#edf2ff',
      px: 32,
      py: 12,
      boxShadow: shadow['medium-1'],
    }}
  >
    {children}
  </Box>
);

export const Align: ComponentStory<typeof Stack> = args => (
  <Stack {...args}>
    <Block>Lirum</Block>
    <Block>Larum</Block>
    <Block>Löffelstiel!</Block>
  </Stack>
);
