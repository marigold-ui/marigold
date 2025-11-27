import type { Meta, StoryObj } from '@storybook/react';
import { alignment } from '@marigold/system';
import { Headline } from '../Headline/Headline';
import { Text } from '../Text/Text';
import { Stack } from './Stack';
import { Block } from './__internal__/Block';

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
      options: Object.keys(alignment.vertical.alignmentX),
      description: 'Horizontal Alignment',
    },
    alignY: {
      control: {
        type: 'select',
      },
      options: Object.keys(alignment.vertical.alignmentY),
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

export const Basic: Story = {
  args: {
    space: 4,
  },
  render: args => (
    <div className="rounded-xl bg-linear-to-b from-gray-50 to-white p-8">
      <Stack {...args}>
        <Block className="max-w-sm">
          <Headline level={2}>Getting Started with Stack</Headline>
        </Block>
        <Block className="max-w-sm">
          The Stack component provides a flexible layout system for arranging
          content vertically or horizontally with consistent spacing. It&apos;s
          designed to handle responsive layouts without writing custom CSS.
        </Block>
        <Block className="max-w-sm">
          Use the space prop to control the distance between elements. You can
          also combine Stack with alignment props to create complex layouts that
          adapt to different screen sizes.
        </Block>
      </Stack>
    </div>
  ),
};

export const Nested: Story = {
  render: args => (
    <Block>
      <Stack {...args}>
        <Stack space={2}>
          <Block>
            <Headline level={2}>With xsmall spacing</Headline>
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
            <Headline level={2}>With Medium Spacing</Headline>
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
  args: {
    space: 8,
    stretch: true,
  },
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

export const AsList: Story = {
  render: args => (
    <Stack {...args} asList>
      <Block>first</Block>
      <Block>second</Block>
    </Stack>
  ),
};
