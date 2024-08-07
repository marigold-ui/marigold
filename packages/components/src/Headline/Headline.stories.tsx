import type { Meta, StoryObj } from '@storybook/react';
import { Headline } from './Headline';

const meta = {
  title: 'Components/Headline',
  component: Headline,
  argTypes: {
    level: {
      control: {
        type: 'select',
      },
      options: ['1', '2', '3', '4', '5', '6'],
      description: 'Level of the headline',
    },
    variant: {
      control: {
        type: 'text',
      },
      description: 'The variant of the headline',
    },
    size: {
      control: {
        type: 'select',
      },
      options: [
        'level-1',
        'level-2',
        'level-3',
        'level-4',
        'level-5',
        'level-6',
      ],
    },
    align: {
      control: {
        type: 'text',
      },
      description: 'Set the text-align of the component',
    },
    color: {
      control: {
        type: 'text',
      },
      description: 'Text color',
      table: {
        defaultValue: {
          summary: 'inherit',
        },
      },
    },
  },
} satisfies Meta<typeof Headline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => <Headline {...args}>This is a Headline!!</Headline>,
};
