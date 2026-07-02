import preview from '.storybook/preview';
import { alignment } from '@marigold/system';
import { Headline } from '../Headline/Headline';
import { Text } from '../Text/Text';
import { Block } from '../__internal__/Block';
import { Stack } from './Stack';

const meta = preview.meta({
  title: 'Components/Stack',
  component: Stack,
  argTypes: {
    space: {
      control: {
        type: 'select',
      },
      options: ['tight', 'related', 'regular', 'group', 'section'],
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
});

export const Basic = meta.story({
  args: {
    space: 'regular',
  },
  render: args => (
    <Block>
      <Stack {...args}>
        <Block>
          <Headline level={2}>Getting Started with Stack</Headline>
        </Block>
        <Block>
          The Stack component provides a flexible layout system for arranging
          content vertically or horizontally with consistent spacing. It&apos;s
          designed to handle responsive layouts without writing custom CSS.
        </Block>
        <Block>
          Use the space prop to control the distance between elements. You can
          also combine Stack with alignment props to create complex layouts that
          adapt to different screen sizes.
        </Block>
        <Stack {...args} space={4}>
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
});

export const AsList = meta.story({
  render: args => (
    <Stack {...args} asList>
      <Block>first</Block>
      <Block>second</Block>
    </Stack>
  ),
});
