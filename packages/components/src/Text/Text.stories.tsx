import preview from '../../../../config/storybook/.storybook/preview';
import { Text } from './Text';

const meta = preview.meta({
  title: 'Components/Text',
  component: Text,
  argTypes: {
    variant: {
      control: {
        type: 'select',
      },
      options: ['none', 'bold', 'muted'],
      description: 'The variant of the text',
    },
    align: {
      control: {
        type: 'text',
      },
      description: 'The align of the text',
    },
    fontSize: {
      control: {
        type: 'text',
      },
      description: 'The font size of the text',
    },
    weight: {
      control: {
        type: 'text',
      },
      description: 'The font weight of the text',
    },
    color: {
      control: {
        type: 'text',
      },
      description: 'The color of the text',
    },
    fontStyle: {
      control: {
        type: 'text',
      },
      description: 'The font style of the text',
    },
    as: {
      control: {
        type: 'select',
      },
      options: ['div', 'p', 'span'],
      description: 'Element to render as Text',
    },
    cursor: {
      control: {
        type: 'text',
      },
      description: 'The cursor for the text',
    },
    lineHeight: {
      control: {
        type: 'select',
      },
      options: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose'],
      description: 'The line height of the text',
    },
  },
});

export const Basic = meta.story({
  args: {
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dignissim dapibus elit, vel egestas felis pharetra non. Cras malesuada, massa nec ultricies efficitur, lectus ante consequat magna, a porttitor massa ex ut quam.',
  },
  render: args => <Text {...args} />,
});

export const Slot = meta.story({
  render: args => (
    <Text slot="description" {...args}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
      dignissim dapibus elit, vel egestas felis pharetra non. Cras malesuada,
      massa nec ultricies efficitur, lectus ante consequat magna, a porttitor
      massa ex ut quam.
    </Text>
  ),
});
