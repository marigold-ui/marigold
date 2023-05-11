import React, { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@marigold/system';

import { Headline } from '../Headline';
import { Text } from '../Text';
import { Stack } from './Stack';

const meta = {
  title: 'Components/Stack',
  component: Stack,
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
      options: ['none', 'left', 'center', 'right'],
      description: 'Vertical Alignment',
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
  <Box
    css={{
      background: 'hsla(218 16% 77% / 50%)',
      border: '1px solid hsla(218 16% 70% / 50%)',
      borderRadius: 12,
      p: 12,
    }}
  >
    {children}
  </Box>
);

export const Basic: Story = {
  render: args => (
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
  ),
};

export const Nested: Story = {
  render: args => (
    <Block>
      <Stack {...args}>
        <Stack space="xsmall">
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
        <Stack space="medium">
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
      <Box css={{ height: 300 }}>
        <Stack {...args}>
          <Block>Lirum</Block>
          <Block>Larum</Block>
          <Block>Löffelstiel!</Block>
        </Stack>
      </Box>
    </Block>
  ),
};
