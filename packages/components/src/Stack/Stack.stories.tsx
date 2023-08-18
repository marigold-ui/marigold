import type { Meta, StoryObj } from '@storybook/react';
import React, { ReactNode } from 'react';

import { Headline } from '../Headline';
import { Text } from '../Text';
import { Stack } from './Stack';

const meta = {
  title: 'Components/Stack',
  component: Stack,
  argTypes: {
    space: {
      control: {
        type: 'text',
      },
      description: 'Responsive Style Value',
    },
    alignX: {
      control: {
        type: 'select',
      },
      options: ['none', 'left', 'center', 'right'],
      description: 'Horizontal Alignment',
    },
    alignY: {
      control: {
        type: 'select',
      },
      options: ['none', 'top', 'center', 'bottom'],
      description: 'Vertical Alignment',
    },
    stretch: {
      control: {
        type: 'boolean',
      },
      description:
        'Stretch to fill space (vertical AND horizontal, useful if you want to change y alignment)',
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

const Block = ({ children }: { children: ReactNode }) => (
  <div className="rounded-xl border border-solid border-gray-200 bg-gray-100 p-3">
    {children}
  </div>
);

export const Basic: Story = {
  render: args => (
    <Stack {...args} space={4}>
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
  ),
};

export const Nested: Story = {
  render: args => (
    <Block>
      <Stack {...args}>
        <Stack space={2}>
          <Block>
            <Headline level="2">With xsmall spacing</Headline>
          </Block>
          <Block>
            <Text>
              Part 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse dignissim dapibus elit, vel egestas felis pharetra
              non. Cras malesuada, massa nec ultricies efficitur, lectus ante
              consequat magna, a porttitor massa ex ut quam.
            </Text>
          </Block>
          <Block>
            <Text>
              Part 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse dignissim dapibus elit, vel egestas felis pharetra
              non. Cras malesuada, massa nec ultricies efficitur, lectus ante
              consequat magna, a porttitor massa ex ut quam.
            </Text>
          </Block>
        </Stack>
        <Stack space={4}>
          <Block>
            <Headline level="2">With Medium Spacing</Headline>
          </Block>
          <Block>
            <Text>
              Part 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse dignissim dapibus elit, vel egestas felis pharetra
              non. Cras malesuada, massa nec ultricies efficitur, lectus ante
              consequat magna, a porttitor massa ex ut quam.
            </Text>
          </Block>
          <Block>
            <Text>
              Part 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse dignissim dapibus elit, vel egestas felis pharetra
              non. Cras malesuada, massa nec ultricies efficitur, lectus ante
              consequat magna, a porttitor massa ex ut quam.
            </Text>
          </Block>
        </Stack>
      </Stack>
    </Block>
  ),
};

export const Stretch: Story = {
  render: args => (
    <Block>
      <div style={{ height: '300px' }}>
        <Stack {...args}>
          <Block>Lirum</Block>
          <Block>Larum</Block>
          <Block>Löffelstiel!</Block>
        </Stack>
      </div>
    </Block>
  ),
};
