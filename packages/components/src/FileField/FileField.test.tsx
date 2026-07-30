/* eslint-disable testing-library/no-node-access */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nProvider } from 'react-aria-components/I18nProvider';
import { Basic, UploadFile } from './FileField.stories';
import { makeFile } from './makeFile';

const dropFiles = (dropzone: Element, files: File[]) => {
  const dataTransfer = new DataTransfer();
  files.forEach(file => dataTransfer.items.add(file));
  for (const type of ['dragenter', 'dragover', 'drop']) {
    dropzone.dispatchEvent(
      new DragEvent(type, { bubbles: true, cancelable: true, dataTransfer })
    );
  }
};

test('renders default labels (en) for dropzone and button', () => {
  render(<Basic.Component label="Label" />);

  expect(screen.getByText('Drop files here')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Upload/i })).toBeInTheDocument();
});

test('renders German labels when locale is de-DE', () => {
  render(
    <I18nProvider locale="de-DE">
      <UploadFile.Component label="Label" multiple />
    </I18nProvider>
  );

  expect(screen.getByText('Dateien hierher ziehen')).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /Hochladen/i })
  ).toBeInTheDocument();
});

test('when multiple is false, only first file is kept', async () => {
  const user = userEvent.setup();
  render(<Basic.Component />);

  const input = document.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement;

  const fileA = makeFile('doc.pdf', 'application/pdf');
  const fileB = makeFile('pic.jpg', 'image/jpeg');

  await user.upload(input, [fileA, fileB]);

  const items = screen.getAllByRole('button', { name: 'Remove file' });
  expect(items.length).toBe(1);
  expect(screen.getByText('doc.pdf')).toBeInTheDocument();
  expect(screen.queryByText('pic.jpg')).not.toBeInTheDocument();
});

test('when multiple, files selected in separate interactions accumulate', async () => {
  const user = userEvent.setup();
  render(<UploadFile.Component multiple />);

  const input = document.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement;

  const fileA = makeFile('a.pdf', 'application/pdf');
  const fileB = makeFile('b.pdf', 'application/pdf');

  await user.upload(input, [fileA]);
  await user.upload(input, [fileB]);

  const items = screen.getAllByRole('button', { name: 'Remove file' });
  expect(items.length).toBe(2);
  expect(screen.getByText('a.pdf')).toBeInTheDocument();
  expect(screen.getByText('b.pdf')).toBeInTheDocument();
});

test('when multiple, re-selecting the same file does not duplicate it', async () => {
  const user = userEvent.setup();
  render(<UploadFile.Component multiple />);

  const input = document.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement;

  const file = makeFile('a.pdf', 'application/pdf');

  await user.upload(input, [file]);
  await user.upload(input, [file]);

  const items = screen.getAllByRole('button', { name: 'Remove file' });
  expect(items.length).toBe(1);
});

test('when multiple is false, a later selection replaces the previous one', async () => {
  const user = userEvent.setup();
  render(<Basic.Component />);

  const input = document.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement;

  const fileA = makeFile('a.pdf', 'application/pdf');
  const fileB = makeFile('b.pdf', 'application/pdf');

  await user.upload(input, [fileA]);
  await user.upload(input, [fileB]);

  const items = screen.getAllByRole('button', { name: 'Remove file' });
  expect(items.length).toBe(1);
  expect(screen.getByText('b.pdf')).toBeInTheDocument();
  expect(screen.queryByText('a.pdf')).not.toBeInTheDocument();
});

test('accepts prop filters files', async () => {
  const user = userEvent.setup();
  render(
    <UploadFile.Component label="Label" accept={['image/*', '.pdf']} multiple />
  );

  const input = document.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement;

  const pdf = makeFile('doc.pdf', 'application/pdf');
  const jpg = makeFile('pic.jpg', 'image/jpeg');
  const txt = makeFile('notes.txt', 'text/plain');

  await user.upload(input, [pdf, jpg, txt]);

  expect(screen.getByText('doc.pdf')).toBeInTheDocument();
  expect(screen.getByText('pic.jpg')).toBeInTheDocument();
  expect(screen.queryByText('notes.txt')).not.toBeInTheDocument();
});

test('remove button removes the corresponding file', async () => {
  const user = userEvent.setup();
  render(<UploadFile.Component multiple />);

  const input = document.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement;

  const fileA = makeFile('a.txt', 'text/plain');
  const fileB = makeFile('b.txt', 'text/plain');

  await user.upload(input, [fileA, fileB]);

  const itemsBefore = screen.getAllByRole('button', { name: 'Remove file' });
  await user.click(itemsBefore[0]);

  const itemsAfter = screen.getAllByRole('button', { name: 'Remove file' });
  expect(itemsAfter.length).toBe(1);
  expect(screen.queryByText('a.txt')).not.toBeInTheDocument();
  expect(screen.getByText('b.txt')).toBeInTheDocument();
});

test('renders with default props', () => {
  render(
    <Basic.Component
      label="Label"
      disabled={undefined}
      accept={undefined}
      multiple={undefined}
    />
  );

  expect(screen.getByText('Drop files here')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Upload/i })).toBeInTheDocument();
});

test('does not render hidden input when name is not set', () => {
  render(<Basic.Component label="Label" />);

  const hiddenInput = document.querySelector('input[type="file"][hidden]');
  expect(hiddenInput).not.toBeInTheDocument();
});

test('renders hidden input when name is set', () => {
  render(<Basic.Component label="Label" name="attachment" />);

  const hiddenInput = document.querySelector(
    'input[type="file"][name="attachment"]'
  ) as HTMLInputElement;
  expect(hiddenInput).toBeInTheDocument();
  expect(hiddenInput).not.toHaveAttribute('multiple');
});

test('hidden input has multiple attribute when multiple is true', () => {
  render(<UploadFile.Component label="Label" name="attachment" multiple />);

  const hiddenInput = document.querySelector(
    'input[type="file"][name="attachment"]'
  ) as HTMLInputElement;
  expect(hiddenInput).toHaveAttribute('multiple');
});

test('hidden input persists after file selection', async () => {
  const user = userEvent.setup();
  render(<UploadFile.Component label="Label" name="docs" multiple />);

  const triggerInput = document.querySelector(
    'input[type="file"]:not([hidden])'
  ) as HTMLInputElement;

  const fileA = makeFile('a.pdf', 'application/pdf');
  const fileB = makeFile('b.pdf', 'application/pdf');
  await user.upload(triggerInput, [fileA, fileB]);

  const hiddenInput = document.querySelector(
    'input[type="file"][name="docs"]'
  ) as HTMLInputElement;
  expect(hiddenInput).toBeInTheDocument();

  expect(screen.getByText('a.pdf')).toBeInTheDocument();
  expect(screen.getByText('b.pdf')).toBeInTheDocument();
});

test('hidden input persists after file removal', async () => {
  const user = userEvent.setup();
  render(<UploadFile.Component label="Label" name="docs" multiple />);

  const triggerInput = document.querySelector(
    'input[type="file"]:not([hidden])'
  ) as HTMLInputElement;

  const fileA = makeFile('a.pdf', 'application/pdf');
  const fileB = makeFile('b.pdf', 'application/pdf');
  await user.upload(triggerInput, [fileA, fileB]);

  const removeButtons = screen.getAllByRole('button', { name: 'Remove file' });
  await user.click(removeButtons[0]);

  const hiddenInput = document.querySelector(
    'input[type="file"][name="docs"]'
  ) as HTMLInputElement;
  expect(hiddenInput).toBeInTheDocument();

  expect(screen.queryByText('a.pdf')).not.toBeInTheDocument();
  expect(screen.getByText('b.pdf')).toBeInTheDocument();
});

test('handles file drop on dropzone', async () => {
  render(<Basic.Component label="Label" />);

  const dropzone = screen.getByTestId('dropzone');
  const file = makeFile('dropped.pdf', 'application/pdf');

  dropFiles(dropzone, [file]);

  await waitFor(() => {
    expect(screen.getByText('dropped.pdf')).toBeInTheDocument();
  });
});

test('when multiple, a dropped file is added to already selected files', async () => {
  const user = userEvent.setup();
  render(<UploadFile.Component label="Label" multiple />);

  const input = document.querySelector(
    'input[type="file"]:not([hidden])'
  ) as HTMLInputElement;

  const selected = makeFile('selected.pdf', 'application/pdf');
  await user.upload(input, [selected]);

  const dropzone = screen.getByTestId('dropzone');
  const dropped = makeFile('dropped.pdf', 'application/pdf');

  dropFiles(dropzone, [dropped]);

  await waitFor(() => {
    expect(screen.getByText('dropped.pdf')).toBeInTheDocument();
  });
  expect(screen.getByText('selected.pdf')).toBeInTheDocument();
});
