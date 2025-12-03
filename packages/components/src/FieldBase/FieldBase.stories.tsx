import type { Meta, StoryObj } from '@storybook/react-vite';
import type { FieldBaseProps } from './FieldBase';
import { FieldBase } from './FieldBase';

const meta = {
  title: 'Components/FieldBase',
  component: FieldBase,
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'This is the label' },
      },
      description: 'The Label of the field',
    },
    description: {
      control: {
        type: 'text',
      },
      description: 'The description',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'This is a help text description' },
      },
    },
    errorMessage: {
      control: {
        type: 'text',
      },
      description: 'The error message',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'Something went wrong' },
      },
    },
    width: {
      control: {
        type: 'text',
      },
      description: 'The width of the field, used Tailwind tokens for this.',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'full' },
      },
    },
    isInvalid: {
      control: {
        type: 'boolean',
      },
      description: 'Wheter if the field is invalid',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isRequired: {
      control: {
        type: 'boolean',
      },
      description: 'Wheter if the field is required',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    errorMessage: 'Something went wrong',
    description: 'This is a help text description',
    label: 'This is the label',
    isRequired: false,
    isInvalid: false,
    width: 'full',
  },
} satisfies Meta<FieldBaseProps<any>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <FieldBase {...args}>
      <input className="border" />
    </FieldBase>
  ),
};
