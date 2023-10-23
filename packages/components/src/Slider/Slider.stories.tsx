import type { Meta, StoryObj } from '@storybook/react';

import { Slider } from './Slider';

const meta = {
  title: 'Components/Slider',
  component: Slider,
  argTypes: {
    children: {
      control: 'text',
      description: 'The label of the slider',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Example Slider' },
      },
    },
    variant: {
      control: {
        type: 'text',
      },
      description: 'Variant to style the Slider',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Whether the Slider is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    maxValue: {
      control: {
        type: 'number',
      },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 500 },
      },
      description: 'The maximum value of the slider',
    },
    step: {
      control: {
        type: 'range',
        min: 1,
        max: 100,
        step: 1,
      },
      table: {
        type: { summary: 'range' },
        defaultValue: { summary: 10 },
      },
      description: 'The step size of the slider',
    },
    width: {
      control: {
        type: 'text',
      },
      description: 'The width of the field',
    },
  },
  args: {
    children: 'Example Slider',
    step: 10,
    maxValue: 500,
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = { render: args => <Slider {...args} /> };

export const Currency: Story = {
  render: args => (
    <Slider formatOptions={{ style: 'currency', currency: 'EUR' }} {...args}>
      this is label
    </Slider>
  ),
};

export const MultipleThumbs: Story = {
  render: args => (
    <Slider defaultValue={[30, 60]} thumbLabels={['start', 'end']}>
      Range
    </Slider>
  ),
};
