import { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'storybook/preview-api';
import { SearchField } from './SearchField';

const meta = {
  title: 'Components/SearchField',
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'The label',
    },
    description: {
      control: {
        type: 'text',
      },
      description: 'Help Text',
      defaultValue: 'This is a help text description',
    },
    error: {
      control: {
        type: 'boolean',
      },
      description: 'Is the input invalid?',
    },
    errorMessage: {
      control: {
        type: 'text',
      },
      description: 'Error Message',
      defaultValue: 'Something went wrong',
    },
    width: {
      control: {
        type: 'text',
      },
      description: 'The width of the field',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    readOnly: {
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    label: 'Select Favorite:',
    description: 'This is a help text description',
    errorMessage: 'Something went wrong',
    readOnly: false,
    disabled: false,
  },
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => <SearchField {...args} required label="search field" />,
};

export const Controlled: Story = {
  render: args => {
    const [value, setValue] = useState('');
    return (
      <>
        <SearchField
          {...args}
          value={value}
          onChange={setValue}
          required
          label="search field"
          placeholder="Type something"
        />
        <pre>
          <strong>Input Value:</strong>
          {value}
        </pre>
      </>
    );
  },
};
