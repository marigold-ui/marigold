import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';

import { Headline } from '../Headline';
import { Stack } from './Stack';
import { Text } from '../Text';

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
      table: {
        defaultValue: {
          summary: 'none',
        },
      },
    },
    align: {
      control: {
        type: 'select',
      },
      options: ['left', 'right', 'center'],
      description: 'HTML element style',
      table: {
        defaultValue: {
          summary: 'left',
        },
      },
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
