import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Radio } from '@marigold/components';

import { RadioGroup } from './RadioGroup';

const meta = {
  title: 'Components/Radio',
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'Label',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Label' },
      },
    },
    orientation: {
      control: {
        type: 'select',
      },
      options: ['horizontal', 'vertical'],
      description: 'Orientation',
      table: {
        type: { summary: 'select' },
        defaultValue: { summary: 'vertical' },
      },
    },
    // required: {
    //   control: {
    //     type: 'boolean',
    //   },
    //   description: 'Required',
    //   table: {
    //     type: { summary: 'boolean' },
    //     defaultValue: { summary: false },
    //   },
    // },
    // disabled: {
    //   control: {
    //     type: 'boolean',
    //   },
    //   description: 'Disabled',
    //   table: {
    //     type: { summary: 'boolean' },
    //     defaultValue: { summary: false },
    //   },
    // },
    // error: {
    //   control: {
    //     type: 'boolean',
    //   },
    //   description: 'Error',
    //   table: {
    //     type: { summary: 'boolean' },
    //     defaultValue: { summary: false },
    //   },
    // },
    width: {
      control: {
        type: 'text',
      },
      description: 'The width of the field',
    },
  },
  args: {
    label: 'Label',
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <RadioGroup {...args} description="Hier steht ein HelpText">
      <Radio value="1">Option 1</Radio>
      <Radio value="2">Option 2</Radio>
      <Radio value="3" disabled>
        Option 3
      </Radio>
      <Radio value="4">Option 4</Radio>
    </RadioGroup>
  ),
};

// export const Error: Story = {
//   render: args => (
//     <Radio.Group errorMessage="Das ist ein Error" error {...args}>
//       <Radio value="1">Option 1</Radio>
//       <Radio value="2">Option 2</Radio>
//       <Radio value="3" disabled>
//         Option 3
//       </Radio>
//       <Radio value="4">Option 4</Radio>
//     </Radio.Group>
//   ),
// };

// export const DefaultSelected: Story = {
//   render: args => (
//     <Radio.Group {...args} defaultValue="2">
//       <Radio value="1">Option 1</Radio>
//       <Radio value="2">Option 2</Radio>
//       <Radio value="3" disabled>
//         Option 3
//       </Radio>
//       <Radio value="4">Option 4</Radio>
//     </Radio.Group>
//   ),
// };
