import { useState } from 'react';
import { I18nProvider } from 'react-aria-components/I18nProvider';
import { expect, waitFor } from 'storybook/test';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { Form } from '../Form/Form';
import {
  WCAG_NON_TEXT,
  contrast,
  flatten,
  insetFocusRing,
  paintedGround,
} from '../contrast.utils';
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

Basic.test(
  'Keyboard focus draws a ring that clears 3:1 against both adjacent colors',
  // Snapshot on: this is the only baseline that shows the drop zone's focus
  // ring, and it is the change in DST-1661 that had neither a test nor a
  // snapshot behind it.
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ canvas, userEvent }) => {
    // One Tab reaches the drop zone. Note the element that takes DOM focus is
    // RAC's own 0x0 proxy `<button aria-label="DropZone">` *inside* the zone --
    // the styled div is never focused itself and carries `data-focus-visible`
    // instead, which is what the theme's `focus-visible:` variant matches
    // (`tailwindcss-react-aria-components` remaps it). Assert on the div.
    await userEvent.tab();

    const dropZone = await waitFor(() => {
      const focused = canvas
        .getByText('Drop files here')
        .closest<HTMLElement>('[data-focus-visible]');
      expect(focused).not.toBeNull();
      return focused!;
    });

    const { boxShadow, ring, color: ringColor } = insetFocusRing(dropZone);
    expect(
      ring,
      `no inset focus ring in box-shadow: ${boxShadow}`
    ).toBeTruthy();
    expect(ringColor, `no color found in shadow: ${ring}`).toBeTruthy();

    // The tint alone composites to ~1.05:1 against the surface, so the ring has
    // to carry the indicator on both sides: the tinted fill inside it and the
    // untinted surface outside.
    const inside = paintedGround(dropZone);
    const outside = paintedGround(dropZone.parentElement);
    expect(outside.length).toBeGreaterThan(0);

    for (const [side, ground] of [
      ['inside (focus tint)', inside],
      ['outside (surface)', outside],
    ] as const) {
      const ratio = contrast(flatten([...ground, ringColor!]), flatten(ground));
      expect(
        ratio,
        `focus ring vs ${side} is ${ratio.toFixed(2)}:1, needs ${WCAG_NON_TEXT}:1`
      ).toBeGreaterThanOrEqual(WCAG_NON_TEXT);
    }
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
    decorators: [
      Story => (
        <I18nProvider locale="en-US">
          <Story />
        </I18nProvider>
      ),
    ],
  },
  async ({ canvas, userEvent }) => {
    // Arrange
    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const fileA = makeFile('abc.pdf', 'application/pdf', 2_000_000);
    const fileB = makeFile('test.txt', 'text/plain', 5_000_000);
    const fileC = makeFile('pic1.jpg', 'image/*', 512_000);
    // Small enough that a fixed MB divisor rendered it as "0.00 MB" (DSTSUP-275).
    const fileD = makeFile('import.csv', 'text/csv', 2400);

    // Act
    await userEvent.upload(input, [fileA, fileB, fileC, fileD]);

    // Assert
    await expect(canvas.getByText('abc.pdf')).toBeInTheDocument();
    await expect(canvas.getByText('test.txt')).toBeInTheDocument();
    await expect(canvas.getByText('pic1.jpg')).toBeInTheDocument();
    await expect(canvas.getByText('import.csv')).toBeInTheDocument();
    await expect(canvas.getByText('2 MB')).toBeInTheDocument();
    await expect(canvas.getByText('5 MB')).toBeInTheDocument();
    await expect(canvas.getByText('512 kB')).toBeInTheDocument();
    await expect(canvas.getByText('2.4 kB')).toBeInTheDocument();
  }
);

export const Small = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  args: {
    label: 'Upload file (compact)',
    size: 'small',
  },
  render: args => (
    <I18nProvider locale="en-US">
      <FileField width={'1/5'} {...args} />
    </I18nProvider>
  ),
});

Small.test(
  'Shows the uploaded file in the compact layout',
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ canvas, userEvent }) => {
    // Arrange
    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = makeFile('compact.pdf', 'application/pdf', 1 * 1024 * 1024);

    // Act
    await userEvent.upload(input, file);

    // Assert
    await expect(canvas.getByText('compact.pdf')).toBeInTheDocument();
  }
);

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
