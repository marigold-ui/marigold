import { useState } from 'react';
import { I18nProvider } from 'react-aria-components/I18nProvider';
import { expect } from 'storybook/test';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { Form } from '../Form/Form';
import { FileField } from './FileField';
import { makeFile } from './makeFile';

const meta = preview.meta({
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
    width: {
      control: { type: 'text' },
      description: 'Sets the width of the field',
    },
  },
  args: {
    label: 'Upload file',
    disabled: false,
    multiple: false,
    accept: [],
  },
});

export const Basic = meta.story({
  tags: ['component-test'],
  render: args => {
    return (
      <I18nProvider locale="en-US">
        <FileField {...args} />
      </I18nProvider>
    );
  },
});

Basic.test(
  'Renders the label, drop zone and upload button',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    await expect(
      canvas.queryByText('Upload file', { exact: true })
    ).toBeInTheDocument();

    await expect(
      canvas.queryByText('Drop files here', { exact: true })
    ).toBeInTheDocument();

    await expect(
      canvas.queryByRole('button', { name: 'Upload' })
    ).toBeInTheDocument();

    await expect(
      canvas.queryByRole('button', { name: 'Upload' })
    ).toHaveTextContent('Upload');
  }
);

export const UploadFile = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  args: {
    label: 'Single Upload',
  },
});

UploadFile.test(
  'Shows the uploaded file in the list',
  async ({ canvas, userEvent }) => {
    // Arrange
    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const fileA = makeFile('a.pdf', 'application/pdf', 2 * 1024 * 1024);

    // Act
    await userEvent.upload(input, fileA);

    // Assert
    await expect(canvas.queryByText('a.pdf', { exact: true })).toBeVisible();
  }
);

UploadFile.test(
  'Shows all uploaded files with their sizes',
  {
    parameters: { chromatic: { disableSnapshot: false } },
    args: {
      label: 'Multifile Upload',
      multiple: true,
    },
  },
  async ({ canvas, userEvent }) => {
    // Arrange
    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const fileA = makeFile('abc.pdf', 'application/pdf', 2 * 1024 * 1024);
    const fileB = makeFile('test.txt', 'text/plain', 5 * 1024 * 1024);
    const fileC = makeFile('pic1.jpg', 'image/*', 0.5 * 1024 * 1024);

    // Act
    await userEvent.upload(input, [fileA, fileB, fileC]);

    // Assert
    await expect(canvas.getByText('abc.pdf')).toBeInTheDocument();
    await expect(canvas.getByText('test.txt')).toBeInTheDocument();
    await expect(canvas.getByText('pic1.jpg')).toBeInTheDocument();
    await expect(canvas.getByText('2.00 MB')).toBeInTheDocument();
    await expect(canvas.getByText('5.00 MB')).toBeInTheDocument();
    await expect(canvas.getByText('0.50 MB')).toBeInTheDocument();
  }
);

export const Small = meta.story({
  tags: ['component-test'],
  args: {
    label: 'Upload file (compact)',
    size: 'small',
  },
  render: args => (
    <I18nProvider locale="en-US">
      <FileField width={'1/5'} {...args} />
    </I18nProvider>
  ),
  play: async ({ canvas, userEvent }) => {
    // Arrange
    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = makeFile('compact.pdf', 'application/pdf', 1 * 1024 * 1024);

    // Act
    await userEvent.upload(input, file);

    // Assert
    await expect(canvas.getByText('compact.pdf')).toBeInTheDocument();
  },
});

export const Disabled = meta.story({
  args: {
    label: 'Disabled',
    disabled: true,
  },
});

export const InForm = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  args: {
    label: 'Upload attachment',
    name: 'attachment',
    multiple: true,
  },
  render: args => {
    const [submitted, setSubmitted] = useState<string[]>([]);
    return (
      <I18nProvider locale="en-US">
        <Form
          onSubmit={e => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const files = formData.getAll('attachment') as File[];
            setSubmitted(files.map(f => `${f.name} (${f.size} bytes)`));
          }}
        >
          <FileField {...args} />
          <Button type="submit" variant="primary">
            Submit
          </Button>
          {submitted.length > 0 && (
            <div data-testid="submitted-files">
              <strong>Submitted files:</strong>
              <ul>
                {submitted.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </Form>
      </I18nProvider>
    );
  },
});

InForm.test(
  'Submits the uploaded file with the form',
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ canvas, userEvent }) => {
    // Arrange
    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = makeFile('report.pdf', 'application/pdf', 1024 * 1024);

    // Act
    await userEvent.upload(input, file);
    await userEvent.click(canvas.getByRole('button', { name: 'Submit' }));

    // Assert
    await expect(canvas.getByTestId('submitted-files')).toBeInTheDocument();
    await expect(
      canvas.getByText('report.pdf (1048576 bytes)')
    ).toBeInTheDocument();
  }
);
