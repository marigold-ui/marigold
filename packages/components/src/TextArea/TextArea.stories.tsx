import { useState } from 'storybook/preview-api';
import preview from '../../../../.storybook/preview';
import { TextArea } from './TextArea';

const meta = preview.meta({
  title: 'Components/TextArea',
  component: TextArea,
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'The label',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Label' },
      },
    },
    placeholder: {
      control: {
        type: 'text',
      },
      description: 'Placeholder Text',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: {
        type: 'text',
      },
      description: 'Help Text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'This is a help text description' },
      },
    },
    error: {
      control: {
        type: 'boolean',
      },
      description: 'Is the input invalid?',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    errorMessage: {
      control: {
        type: 'text',
      },
      description: 'Error Message',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Something went wrong' },
      },
    },

    required: {
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
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
    width: {
      control: {
        type: 'text',
      },
      description: 'The width of the field',
    },
    rows: {
      control: {
        type: 'number',
      },
      description: 'The number of rows',
    },
  },
  args: {
    label: 'Label',
    description: 'This is a help text description',
    errorMessage: 'Something went wrong',
    error: false,
    readOnly: false,
    disabled: false,
    required: false,
  },
});

export const Basic = meta.story({
  render: args => <TextArea {...args} />,
});

export const Controlled = meta.story({
  render: args => {
    const [value, setValue] = useState('');
    return (
      <>
        <TextArea {...args} value={value} onChange={setValue} />
        <pre>
          <strong>Input Value:</strong>
          {value}
        </pre>
      </>
    );
  },
});
