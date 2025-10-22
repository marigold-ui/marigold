import type { Meta, StoryObj } from '@storybook/react';
import { FileField } from './FileField';

const meta = {
  title: 'Components/FileField',
  component: FileField,
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'The label displayed above the field',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Upload file' },
      },
    },
    description: {
      control: { type: 'text' },
      description: 'Help text displayed below the field',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Choose a file to upload' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    allowsMultiple: {
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    acceptedFileTypes: {
      control: { type: 'object' },
      description: 'Accepted file types',
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: '["pdf"]' },
      },
    },
    width: {
      control: { type: 'text' },
      description: 'Sets the width of the field',
    },
  },
  args: {
    label: 'Upload file',
    description: 'Choose a file to upload',
    disabled: false,
    allowsMultiple: false,
    acceptedFileTypes: ['*'],
    dropZoneLabel: 'Choose a file to upload',
  },
} satisfies Meta<typeof FileField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => {
    //let [files, setFiles] = useState<File[] | null>(null);

    return (
      <FileField
        {...args}
        dropZoneLabel="Drop your files here"
        allowsMultiple
        acceptedFileTypes={['image/png']}
      />
    );
  },
};
