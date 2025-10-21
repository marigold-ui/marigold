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
    disabled: false,
    allowsMultiple: false,
    dropZone: false,
    acceptedFileTypes: ['*'],
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
            <FileField.Item
              key={index}
              onRemove={() =>
                setFiles(prev => (prev ?? []).filter((_, i) => i !== index))
              }
            >
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
