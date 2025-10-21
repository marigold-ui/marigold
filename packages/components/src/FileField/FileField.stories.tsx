import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'storybook/preview-api';
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
    error: {
      control: { type: 'boolean' },
      description: 'Marks the field as invalid',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    errorMessage: {
      control: { type: 'text' },
      description: 'Error message shown when error is true',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Something went wrong' },
      },
    },
    required: {
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    multiple: {
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    accept: {
      control: { type: 'object' },
      description: 'Accepted file types',
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: '["pdf"]' },
      },
    },
    dropZone: {
      control: { type: 'boolean' },
      description: 'Wraps the trigger with a DropZone',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
    errorMessage: 'Something went wrong',
    disabled: false,
    required: false,
    error: false,
    multiple: false,
    dropZone: false,
    accept: ['*'],
    dropZoneLabel: 'Choose a file to upload',
  },
} satisfies Meta<typeof FileField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let [files, setFiles] = useState<File[] | null>(null);
    return (
      <>
        <FileField
          {...args}
          dropZoneLabel="Drop your files here"
          dropZone={true}
          allowsMultiple
          onChange={files => {
            setFiles(files);
          }}
          acceptedFileTypes={['image/png']}
        >
          {files?.map((file, index) => (
            <FileField.Item key={index}>
              <div className="flex min-w-0 flex-col gap-0.5">
                <p className="truncate text-[13px] font-medium">{file.name}</p>
                <p className="text-muted-foreground text-xs">
                  {file.size / 1024} MB
                </p>
              </div>
            </FileField.Item>
          ))}
        </FileField>
      </>
    );
  },
};
